import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text, Button, TouchableOpacity} from 'react-native';
import { connect } from "react-redux";
import {globalStyle, AppStyles} from "./global-style";
import {
	uploadImage, getUploadedImages
  } from "../../redux/actions/ActionCreators";

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
			<div>{this.props.auth.user.displayName}</div>
               }
			{this.props.profile.images.map((image) =>
				<img
				src={image.imageUrl}
				alt="Uploaded Image"
				height="100"
				width="100"
			/>
			)}
			Home Page
			<input type="file" onChange={this.handleChange} />
			<TouchableOpacity
                    style={globalStyle.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => this.callUpload()}>
                    <Text style={globalStyle.buttonTextStyle}>Upload Image</Text>
                  </TouchableOpacity>
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
  });

  export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);