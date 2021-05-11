import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import {
	getUploadedImages
  } from "../../redux/actions/ActionCreators";

const mapDispatchToProps = (dispatch) => ({
	getUploadedImages: () => dispatch(getUploadedImages())
  });

const mapStateToProps = (state) => {
	return {
	  auth: state.auth,
	};
};

class WelcomeScreen extends Component {
	constructor(props){
		super(props);
		this.state = {
			animating: true,
		}
	}

	componentDidMount() {
		this.props.getUploadedImages()
		// could get rid of timeout and automatically redirect
		// if sign in function not called in index could use loading state while function runs 
		// replace async storage call with redux state check 
		setTimeout(() => {
			this.setState({animating: false})
			//Check if user_id is set or not
			//If not then send for Authentication
			//else send to Home Screen

			this.props.navigation.replace(
			this.props.auth.logged_in === false ? 'Auth' : 'HomeScreen'
			)
			
			// AsyncStorage.getItem('user_id').then((value) =>
			//   this.props.navigation.replace(
			// 	value === null ? 'Auth' : 'DrawerNavigationRoutes'
			//   ),
			// );
		  }, 500);
	}


	render() {
		return (
			<View style={localStyle.container}>
			  <Image
				source={require('../img/nfty_logo.png')}
				style={{width: '90%', resizeMode: 'contain', margin: 30}}
			  />
			  <ActivityIndicator
				animating={this.state.animating}
				color="#FFFFFF"
				size="large"
				style={localStyle.activityIndicator}
			  />
			</View>
		  );
	  }
}

const localStyle = StyleSheet.create({
	container: {
	  flex: 1,
	  alignItems: 'center',
	  justifyContent: 'center',
	  backgroundColor: '#000000',
	},
	activityIndicator: {
	  alignItems: 'center',
	  height: 80,
	},
  });

// export default WelcomeScreen;
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);