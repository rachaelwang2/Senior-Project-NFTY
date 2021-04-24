import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyle} from "./global-style";

class SignUpScreen extends Component {
	constructor(props){
		super(props);
	}
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <div>
				<TouchableOpacity
                    style={globalStyle.buttonStyle}
                    activeOpacity={0.5}
                    onPress = {()=> this.props.navigation.navigate('WelcomeScreen')}
                    >
                    <Text style={globalStyle.buttonTextStyle}>Home</Text>
                  </TouchableOpacity>
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

export default SignUpScreen;