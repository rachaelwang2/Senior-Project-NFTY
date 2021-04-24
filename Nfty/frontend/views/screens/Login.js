import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyle} from "./global-style";

class LoginScreen extends Component {
	constructor(props){
		super(props);
	}
    render() {
        return (
            <View style= {globalStyle.container}>
                <div>
				<Text style = {localStyle.logoText}> Login</Text>	
				<Button onPress = {()=> this.props.navigation.replace('WalletConnectScreen')} title = "Log In"/>
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

export default LoginScreen;