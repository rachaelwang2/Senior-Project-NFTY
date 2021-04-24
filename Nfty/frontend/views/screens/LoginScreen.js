import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text, TextInput, Button, Alert, 
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyle} from "./global-style";

class LoginScreen extends Component {
	constructor(props){
		super(props);
	}
    render() {
        return (
            <KeyboardAvoidingView style={globalStyle.containerView} behavior="padding">
              <View style={globalStyle.container}>
                <View style={globalStyle.InputContainer}>
                <Text style={[globalStyle.title, globalStyle.leftTitle]}>Login</Text>
                  <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={globalStyle.body} />
                  <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={globalStyle.body} secureTextEntry={true}/>
                  <Button
                    containerStyle={globalStyle.loginContainer}
                    style={globalStyle.loginText}
                    onPress={() => this.onLoginPress()}
                    title="Login"
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
        )
    }
}

const localStyle = StyleSheet.create({
	logoText: {
		fontSize: 20
	},
});

export default LoginScreen;