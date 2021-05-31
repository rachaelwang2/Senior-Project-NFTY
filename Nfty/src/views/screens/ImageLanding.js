import React, { Component } from 'react';
import {View, StyleSheet, Image, Text, Button, TouchableOpacity, Platform} from 'react-native';
import { connect } from "react-redux";
import {globalStyle, AppStyles} from "./global-style";
import {
	uploadImage, getUploadedImages
  } from "../../redux/actions/ActionCreators";
import * as ImagePicker from 'expo-image-picker';


const mapDispatchToProps = (dispatch) => ({
	uploadImage: (path, filename) => dispatch(uploadImage(path, filename)),
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
		}
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
	}

	pickImage = async () => {
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
		const response = await fetch(this.state.image);
    	const blob = await response.blob();
		const num = this.props.profile.images.length + 1;
		const filename = `image_${num}`;     
		this.props.uploadImage(blob, filename)
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
					style={globalStyle.buttonStyle}
					activeOpacity={0.5}
					onPress={() => this.pickImage()}>
					<Text style={localStyle.buttonTextStyle}>Pick Image from Gallery</Text>
				</TouchableOpacity>
				{this.state.image && 
				<View style={{
					flex: 1,
					}}>
					<Image source={{uri: this.state.image}} style={{flex: 1}}/>	
					<TouchableOpacity
						style={globalStyle.buttonStyle}
						activeOpacity={0.5}
						onPress={() => this.callUpload()}>
						<Text style={localStyle.buttonTextStyle}>Upload Image</Text>
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
	buttonTextStyle: {
		color: '#FFFFFF',
		paddingVertical: 8,
		marginLeft: 35,
		marginRight: 35,
		fontSize: 16,
	  },
  });

  export default connect(mapStateToProps, mapDispatchToProps)(ImageLanding);