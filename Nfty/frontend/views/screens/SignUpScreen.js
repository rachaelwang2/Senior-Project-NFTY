import React, { Component } from 'react';
import {ActivityIndicator, View, ScrollView, StyleSheet, Image, Text, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyle} from "./global-style";

class SignUpScreen extends Component {
	constructor(props){
		super(props);
	}

	// TO DO: add sign up functionality and save to storage, add facebook and instagram login
    render() {
        return (
            <View >
				<TouchableOpacity
                    style={globalStyle.buttonStyle}
                    activeOpacity={0.5}
                    onPress = {()=> this.props.navigation.navigate('WelcomeScreen')}
                    >
                    <Text style={globalStyle.buttonTextStyle}>Home</Text>
                  </TouchableOpacity>
				  <Text
                    style={globalStyle.registerTextStyle}
                    onPress={() => this.props.navigation.navigate('LoginScreen')}>
                    Have an account? Login
                  </Text>
			</View>
        )
    }
}

export default SignUpScreen;