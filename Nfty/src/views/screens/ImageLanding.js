import React, { Component } from 'react';
import {View, StyleSheet, Image, Text, Button, TouchableOpacity, Platform} from 'react-native';
import { connect } from "react-redux";
import {globalStyle, AppStyles} from "./global-style";
import {
	uploadImage, getUploadedImages, web3Provider
  } from "../../redux/actions/ActionCreators";
import * as ImagePicker from 'expo-image-picker';
import {HARDHAT_PRIVATE_KEY} from '@env';

const ALCHEMY_API_URL = 'wss://eth-ropsten.ws.alchemyapi.io/v2/124IV9lnccOe5WGemFFqps7iLpzbCuT8';
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(ALCHEMY_API_URL);


const mapDispatchToProps = (dispatch) => ({
	uploadImage: (path, filename, tokenId) => dispatch(uploadImage(path, filename, tokenId)),
	getUploadedImages: () => dispatch(getUploadedImages())
  });

  const mapStateToProps = (state) => {
	return {
	  auth: state.auth,
	  profile: state.profile
	};
};

class ImageLanding extends Component {
	constructor(props){
		super(props);
		this.state = {
			image: null,
			image_name: null,
			hasGalleryPermission: null,
			uploaded_img: false,
			web3: web3Provider(),
		}
		console.log(props);
		this.pickImage = this.pickImage.bind(this)
		this.callUpload = this.callUpload.bind(this);
	}

	async componentDidMount() {
		console.log(this.props);
		if (this.props.profile.images === undefined || this.props.profile.images.length == 0) {
			this.props.getUploadedImages()
		}
		const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
	  	this.setState({ hasGalleryPermission: galleryStatus.status === 'granted'})
	}

	componentDidUpdate(prevProps) {
		if (this.props.profile.img !== prevProps.profile.img) {
			if(this.props.profile.img ) {
				this.setState({uploaded_img: true})
			}
		}
	}

	pickImage = async () => {
		this.setState(() => ({uploaded_img: false, image: null}))
		let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  allowsEditing: true,
		  aspect: [1, 1],
		  quality: 1,
		});
	
		console.log(result);
	
		if (!result.cancelled) {
			console.log("setting")
			this.setState(() => ({image: result.uri}))
		}
	};

	callUpload = async () => {
		if (!this.state.image) {
			alert("Select an image for upload.")
			return
		}

		this.setState(() => ({uploaded_img: false}))
		const response = await fetch(this.state.image);
    	const blob = await response.blob();
		const num = this.props.profile.images.length + 1;
		const filename = `image_${num}`; 
		// const nftURI = 'https://us-central1-nfty-dc26a.cloudfunctions.net/get_metadata?tokenId=';
		const nftURI = 'http://localhost:5001/nfty-dc26a/us-central1/get_metadata?tokenId=';
		const nonce = await this.state.web3.eth.getTransactionCount('0x3276abD7B68736DDa8aBE00188ECb3Dfcbd16ba4', 'latest');
		// const nonce = await this.state.web3.eth.getTransactionCount('0xbc05baba15268342a0333ee666713a52ab4ebc93', 'latest');
		const gasEstimate = await this.props.profile.nftContract.methods.createNFT('0x3276abD7B68736DDa8aBE00188ECb3Dfcbd16ba4', nftURI).estimateGas();
		const tx = {
			'from': '0x3276abD7B68736DDa8aBE00188ECb3Dfcbd16ba4',
			'to': '0xb63e7fFA48CDC7d08DD4C71AD9b7eC10E9ED1342',
			// 'from': '0xbc05baba15268342a0333ee666713a52ab4ebc93',
			// 'to': '0x7f6688c8c18cb4640830140650261d903b87f79f',
			'nonce': nonce,
			'gas': 500000,
			'data': this.props.profile.nftContract.methods.createNFT('0x3276abD7B68736DDa8aBE00188ECb3Dfcbd16ba4', nftURI).encodeABI()
		};
		const signPromise = this.state.web3.eth.accounts.signTransaction(tx, '0xbffa6ced3da1080e210f2a11c8c4c4b10e60fe3a0db3bf5f60260aea162a4d97');
		// const signPromise = this.state.web3.eth.accounts.signTransaction(tx, HARDHAT_PRIVATE_KEY);

		signPromise.then((signedTx) => {
			console.log("signedTx:", signedTx);
			web3.eth.sendSignedTransaction(signedTx.rawTransaction)
				.on('receipt', (receipt) => {
					console.log(receipt);
				});
			// web3.eth.sendSignedTransaction(signedTx.rawTransaction function(err, hash) {
			// 	if(!err){
			// 		console.log("The hash of your transaction is: ", hash);
			// 		const tokenId = 0; //response.events.Transfer.returnValues.tokenId;
			// 		this.props.uploadImage(blob, filename, tokenId);
			// 	}else{
			// 		console.log("Something went wrong when creating your NFT", err);
			// 	}
			// });
		}).catch((err) => {
			console.log("Promise Failed:", err);
		});
		this.props.profile.nftContract.events.Transfer({}, (error, event) => {
			if(error){
				console.error(error);
			} else {
				console.log("Got back event:", JSON.stringify(event, null, 2));
				const tokenId = event.returnValues.tokenId;
				this.props.uploadImage(blob, filename, tokenId);
			}	
			
		});
		// this.props.uploadImage(blob, filename)

	}

	render() {
		return (
			<View
			style={{
			flex: 1,
			backgroundColor: '#FFFFFF',
			justifyContent: 'center',
			alignItems: 'center',
			}}>
				<Text style={[globalStyle.title]}>Upload a Photo to Create an NFT</Text>
				<Image
				source={require('../img/nfty_logo.png')}
				style={{
					width: '50%',
					height: 100,
					resizeMode: 'contain',
					alignSelf: 'center',
					margin: 30,
				}}
				/>
				<TouchableOpacity
					style={localStyle.buttonStyle}
					activeOpacity={0.5}
					onPress={() => this.pickImage()}>
					<Text style={localStyle.buttonTextStyle}>Pick Image from Gallery</Text>
				</TouchableOpacity>
				{this.state.image && 
				<View style={{
					flex: 1,
					}}>
					<Image source={{uri: this.state.image}} 
					style={{
					width: 200,
					height: 200,
					padding: 20,
					margin: 20,
					alignSelf: 'center',
					}}/>
					<TouchableOpacity
						style={localStyle.buttonStyle}
						activeOpacity={0.5}
						onPress={() => this.callUpload()}>
						<Text style={localStyle.buttonTextStyle}>Upload Image</Text>
					</TouchableOpacity>
				</View>
				}
				{this.state.uploaded_img && 
				<View style={{
					flex: 1,
					}}>
					<Text style={localStyle.successTextStyle}>Image successfully uploaded!</Text>
					<TouchableOpacity
					style={localStyle.buttonStyle}
					activeOpacity={0.5}
					onPress={() => this.props.navigation.navigate('ProfileScreen')}>
					<Text style={localStyle.buttonTextStyle}>View Your NFT in Your Profile</Text>
					</TouchableOpacity>
				</View>
				}
			</View>
		  );
	  }
}

const localStyle = StyleSheet.create({
	container: {
	  flex: 1,
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	buttonStyle: {
		backgroundColor: '#000000',
		borderWidth: 0,
		color: '#000000',
		borderColor: '#7DE24E',
		height: 40,
		alignItems: 'center',
		borderRadius: 30,
		marginLeft: 35,
		marginRight: 35,
		marginTop: 20,
		marginBottom: 10,
	  },
	buttonTextStyle: {
		color: '#FFFFFF',
		paddingVertical: 8,
		marginLeft: 35,
		marginRight: 35,
		fontSize: 16,
	  },
	  successTextStyle: {
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 18,
		padding: 30,
	  },
  });

  export default connect(mapStateToProps, mapDispatchToProps)(ImageLanding);