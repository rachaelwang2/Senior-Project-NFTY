import * as ActionTypes from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { firestore, fireauth, auth, firebasestore, storage } from "../../firebase/config"
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'

export const testFunction = () => (dispatch) => {
	console.log("action creator called")
}

// test user objects are consistent

const fireauth = auth;

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
			dispatch(receiveLogin(user.data()));
		}
		})
		.catch(function(error) {
		console.log(error)
		});
		  //dispatch(receiveLogin(user));
		} 
		// else {
		// 	const email = await AsyncStorage.getItem("@loggedInUserID:key");
		// 	const password = await AsyncStorage.getItem("@loggedInUserID:password");
		// 	const id = await AsyncStorage.getItem("@loggedInUserID:id");
		// 	if (
		// 	  id != null &&
		// 	  id.length > 0 &&
		// 	  password != null &&
		// 	  password.length > 0 &&
		// 	  email != null &&
		// 	  email.length > 0
		// 	) {
		// 	  auth
		// 		.signInWithEmailAndPassword(email, password)
		// 		.then(user => {
		// 		  firestore
		// 			.collection("users")
		// 			.doc(id)
		// 			.get()
		// 			.then(function(user) {
		// 			  if (user.exists) {
		// 				dispatch(receiveLogin(user.data()));
		// 			  }
		// 			})
		// 			.catch(function(error) {
		// 			  console.log(error)
		// 			});
		// 		})
		// 		.catch(error => {
		// 		  console.log(error)
		// 		});
		// 	  return;
		// 	}
		// }
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
              dispatch(receiveLogin(user.data()));
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

export const uploadImage = (path, fileName) => (dispatch) => {
	auth().onAuthStateChanged(function (user) {
		if (user) {
			const id = user.uid;
			let reference = storage.ref(`images/${fileName}`);        
			let task = storage.ref(`images/${fileName}`).put(path);     
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
				storage
				  .ref("images")
				  .child(fileName)
				  .getDownloadURL()
				  .then(url => {
					// store in firestore database
					const data = {
						imageUrl: url,
						// could add date field 
					};
					firestore()
					.collection("images")
					.doc(id)
					.collection("uploads")
					.doc(fileName)
					.set(data);

					dispatch(imageUploaded(data));
					console.log("photo uploaded to storage url stored in database")
				  });
			  }
			);
		
			// task.then(() => {                                 
			//     console.log('Image uploaded to Firebase storage');
			// }).catch((e) => console.log('uploading image error => ', e));
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