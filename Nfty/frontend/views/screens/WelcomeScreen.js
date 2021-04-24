import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyle} from "./global-style";

class WelcomeScreen extends Component {
	constructor(props){
		super(props);
	}
    render() {
        return (
            <View style= {globalStyle.container}>
                <div>
				<Text style = {localStyle.logoText}> Welcome to Nfty</Text>	
				<Button onPress = {()=> this.props.navigation.navigate('Auth')} title = "Log In"/>
				</div>
			</View>
        )
    }
}

const localStyle = StyleSheet.create({
	logoText: {
		fontSize: 20
	},
});

export default WelcomeScreen;