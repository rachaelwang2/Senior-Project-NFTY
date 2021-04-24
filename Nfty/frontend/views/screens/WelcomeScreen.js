import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyle} from "./global-style";

class WelcomeScreen extends Component {
	constructor(props){
		super(props);
	}
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <div>
				<Text style = {localStyle.logoText}> Welcome to Nfty</Text>	
				{/* <Button containerStyle={globalStyle.buttonTextStyle} style={globalStyle.buttonTextStyle} onPress = {()=> this.props.navigation.navigate('Auth')} title = "Log In"/> */}
				<TouchableOpacity
                    style={globalStyle.buttonStyle}
                    activeOpacity={0.5}
                    onPress = {()=> this.props.navigation.navigate('Auth')}
                    >
                    <Text style={globalStyle.buttonTextStyle}>Login</Text>
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

export default WelcomeScreen;