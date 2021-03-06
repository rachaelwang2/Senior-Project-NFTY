import * as ActionTypes from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import Web3 from 'web3';
import {HARDHAT_PORT, HARDHAT_PRIVATE_KEY, HOST_ADDRESS} from '@env';


const fireauth = auth;
const firebasefunc = functions;

export const attemptLogin = () => (dispatch) => {
	auth().onAuthStateChanged(function (user) {
		if (user) {
		console.log("user is already cached", user);
		const id = user.uid;
		firestore()
		.collection("users")
		.doc(id)
		.get()
		.then(function(user) {
		if (user.exists) {
			var user_data = user.data();
			user_data["id"] = id;
			dispatch(receiveLogin(user_data));
		}
		})
		.catch(function(error) {
		console.log(error)
		});
		} 
	  });
}

export const loginUser = (email, password) => (dispatch) => {
    if (email.length <= 0 || password.length <= 0) {
      alert("Please fill out the required fields.");
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
		console.log(response)
        const user_uid = response.user.uid;
        firestore()
          .collection("users")
          .doc(user_uid)
          .get()
          .then(function(user) {
            if (user.exists) {
			// console.log(auth.currentUser)
			// console.log(user.data())
              AsyncStorage.setItem("@loggedInUserID:id", user_uid);
              AsyncStorage.setItem("@loggedInUserID:key", email);
              AsyncStorage.setItem("@loggedInUserID:password", password);
			  console.log("User successfully logged in")
              var user_data = user.data();
				user_data["id"] = user_uid;
				dispatch(receiveLogin(user_data));
            } else {
              alert("User does not exist. Please try again.");
			  dispatch(loginError("User does not exist. Please try again."));
            }
          })
          .catch(function(error) {
            console.log(error)
          });
      })
     .catch(error => {
		console.log(error)
		alert(`${error.message} Please try again.`);
		dispatch(loginError("User does not exist. Please try again."));
      });
}

export const signOutUser = () => (dispatch) => {
	auth().signOut().then(()=> {
		//sign-out successful. 
		console.log("User signed out");
		dispatch(logout());
	}).catch((error)=>{
		//an error happened.
		console.log(error); 
	});	
}

export const signupUser = (email, password, fullname) => (dispatch) => {
	if (email.length <= 0 || password.length <= 0) {
		alert("Please fill out the required fields.");
		return;
	}
	
	auth()
	.createUserWithEmailAndPassword(email, password)
	.then(response => {
		const data = {
			email: email,
	     	displayName: fullname,
		};
		console.log(response);
		const user_uid = response.user.uid;
		firestore()
			.collection("users")
			.doc(user_uid)
			.set(data);
		firestore()
			.collection("users")
			.doc(user_uid)
			.get()
			.then(function(user) {
				dispatch(signupSuccess());
			})
			.catch(function(error) {
				console.log(error)
				alert("Error signing up user. Please try again.");
			});
	})
	.catch(error => {
		console.log(error)
		alert(`Error signing up user. ${error.message} Please try again.`);
	});

}

export const uploadImage = (path, fileName, tokenId, loc) => (dispatch) => {
	auth().onAuthStateChanged(function (user) {
		if (user) {
			const id = user.uid;
			let reference = storage().ref(`images/${fileName}`);        
			let task = storage().ref(`images/${fileName}`).put(path);     
			task.on('state_changed', snapshot => {
				let progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
	             // can send progress to redux for frontend rendering 
				  );
			  },
			  error => {
				console.log(error);
			  },
			  () => {
				storage()
				  .ref("images")
				  .child(fileName)
				  .getDownloadURL()
				  .then(url => {
					// store in firestore database
					const data = {
						imageUrl: url,
						blockchainHash: loc,
						// could add date field 
					};
					firestore()
					.collection("images")
					.doc(id)
					.collection("uploads")
					.doc(fileName)
					.set(data);

					dispatch(imageUploaded(data));
					console.log("photo uploaded to storage url stored in database");
					//NFT stuff
					const nftData = {
						image_uri: url, 
						creator: id,
						owner: id,
						name: fileName,
						tokenId: tokenId, 
						//other special things about the NFT
					};
					deployMetada(nftData);
				  });
			  }
			);
		}
	});
}

export const getUploadedImages = () => (dispatch) => {
	auth().onAuthStateChanged(function (user) {
	  if (!user) return;
	  const id = user.uid;
	  firestore()
		.collection("images")
		.doc(id)
		.collection("uploads")
		// .orderBy("date")
		.get()
		.then((snapshot) => {
		  const data = snapshot.docs.map((doc) => doc.data());
		  console.log(data)
		  dispatch(setImages(data));
		  return data;
		});
	});
  };


export const receiveLogin = (user) => {
	return {
	  type: ActionTypes.LOGIN_SUCCESS,
	  payload: user,
	};
  };

export const loginError = (message) => {
	return {
		type: ActionTypes.LOGIN_FAILURE,
		payload: message,
	};
};

export const logout = () => {
	return {
		type: ActionTypes.LOGGED_OUT,
	};
};

export const signupSuccess = () => {
	return {
		type: ActionTypes.SIGNUP_SUCCESS,
	};
};

export const signupError = (message) => {
	return {
		type: ActionTypes.SIGNUP_FAILURE,
		payload: message,
	};
};

export const imageUploaded = (img) => {
	return {
	  type: ActionTypes.IMAGE_UPLOAD,
	  payload: img,
	};
};

export const setImages = (images) => {
	return {
	  type: ActionTypes.IMAGES_FETCHED,
	  payload: images,
	};
};

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");


export const web3Provider = () => {
	// return new Web3(new Web3.providers.HttpProvider(`http://localhost:${HARDHAT_PORT}`));
	const url = "wss://eth-ropsten.ws.alchemyapi.io/v2/124IV9lnccOe5WGemFFqps7iLpzbCuT8";
	return new createAlchemyWeb3(url);
}

export const deployMetada = (data) => {
	// firebasefunc().useFunctionsEmulator('http://localhost:5001');
	var writeMetadata = firebasefunc().httpsCallable('write_metadata');
	writeMetadata(data, auth)
		.then(response => {
			console.log("Got response from firebase");
			console.log(response);

			//
		})
		.catch((error) => {
			console.error(error);
		});
}

export const getMetadata = async (tokenId) =>{
	// firebasefunc().useFunctionsEmulator('http://localhost:5001');
	// const baseURI = 'https://us-central1-nfty-dc26a.cloudfunctions.net/get_metadata?tokenId=';
	const baseURI = 'http://localhost:5001/nfty-dc26a/us-central1/get_metadata?tokenId=';
	const response = await fetch(baseURI + tokenId);

	console.log('response from get getMetadata');
	console.log(response);
}

export const registerWallet = (account) => {
	auth.onAuthStateChanged(async function (user) {
		if(user){
			firestore
			.collection("users")
			.doc(user.uid)
			.update({
				wallet: account
			});
		}
	})
}