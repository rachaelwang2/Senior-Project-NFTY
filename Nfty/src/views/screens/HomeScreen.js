import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text, Button, TouchableOpacity, Platform} from 'react-native';
import { connect } from "react-redux";
import {globalStyle, AppStyles} from "./global-style";
import {
	uploadImage, getUploadedImages
  } from "../../redux/actions/ActionCreators";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


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

class HomeScreen extends Component {
	constructor(props){
		super(props);
		this.state = {
			animating: true,
			image: null,
			image_name: undefined,
			uploaded_img: null,
		}
		this.callUpload = this.callUpload.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = e => {
		if (e.target.files[0]) {
		  const img = e.target.files[0];
		  let name = img.name
		  const filename = name.substring(0, img.name.indexOf('.'));
		  this.setState(() => ({ image: img, image_name: filename }));
		}
	};

	handleNative = e => {
		console.log(e.errorMessage)
		if(!e.didCancel){
			this.setState(() => ({image: e.uri, image_name: e.filename}))
		}else{
			console.log("image selection cancelled")
		}
	}

	componentDidMount() {
		if (this.props.profile.images === undefined || this.props.profile.images.length == 0) {
			this.props.getUploadedImages()
		}
		this.props.profile.images.forEach((img) => {
			console.log(img)
			console.log(img.imageUrl)
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.profile.img !== prevProps.profile.img) {
			if(this.props.profile.img ) {
				this.setState({uploaded_img: this.props.profile.img})
			}
		}
	}

	callUpload = () => {
		if (!this.state.image) {
			alert("Select an image for upload.")
			return
		}
		this.props.uploadImage(this.state.image, this.state.image_name)
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
				<Text style={[globalStyle.title]}>Submit a Work</Text>
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
				{this.props.auth.logged_in  &&
				<Text>{this.props.auth.user.displayName}</Text>
               	}
               	
				{Platform.OS === 'web' && (
					<input type="file" onChange={this.handleChange} />

				)}
				{!(Platform.OS === 'web') && (
					<Button 
					title="Choose Photo"
					onPress= {() => 
							launchImageLibrary({mediaType: 'mixed'}, (response) => {
								this.handleNative(response)
							})


					}
					/>
				)}
				<TouchableOpacity
					style={globalStyle.buttonStyle}
					activeOpacity={0.5}
					onPress={() => this.callUpload()}>
					<Text style={localStyle.buttonTextStyle}>Upload Image</Text>
				</TouchableOpacity>
				<Text style={[globalStyle.subtitle]}>Uploaded Images:</Text>
				{this.props.profile.images.map((image) =>
					<Image 
					source ={{uri: image.imageUrl}}
					style={{
						width: '50%',
						height: 100,
						resizeMode: 'contain',
						alignSelf: 'center',
						margin: 30,
					}}
					/>
				)}
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

  export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);