import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text, Button, TouchableOpacity} from 'react-native';

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

export default HomeScreen;