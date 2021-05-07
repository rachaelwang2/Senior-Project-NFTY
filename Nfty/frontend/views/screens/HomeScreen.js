import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text, Button, TouchableOpacity} from 'react-native';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
	  auth: state.auth,
	};
};

class HomeScreen extends Component {
	constructor(props){
		super(props);
		this.state = {
			animating: true,
		}
	}

	componentDidMount() {
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
			Home Page
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

  export default connect(mapStateToProps, null)(HomeScreen);