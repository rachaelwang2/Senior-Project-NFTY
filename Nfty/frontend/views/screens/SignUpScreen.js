import React, { Component } from 'react';
import {ActivityIndicator, View, ScrollView, StyleSheet, Image, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InstagramLogin from 'react-native-instagram-login';
import {globalStyle} from "./global-style";

{/* <InstagramLogin
	ref={ref => (this.instagramLogin = ref)}
	clientId='931cca1d0c154de3aafd83300ff8b288'
	redirectUrl='https://google.com'
	scopes={['public_content+follower_list']}
	onLoginSuccess={(token) => this.setState({ token })}
	onLoginFailure={(data) => this.setState({ failure: data })}
	/> */}

class SignUpScreen extends Component {
	constructor(props){
		super(props);
		this.state = {
			userName: '',
			userEmail: "",
			password: "", 
			loading: false, 
			errortext: "", 
			registrationSuccess: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = () => {
		this.setState({ errortext: '' })
		if (!this.state.userEmail) {
			alert('Please fill Email');
			return;
		  }
		if (!this.state.userName) {
		  alert('Please fill Name');
		  return;
		}
		if (!this.state.userPassword) {
		  alert('Please fill Password');
		  return;
		}
		setLoading(true);
		var dataToSend = {
		  name: this.state.userName,
		  email: this.state.userEmail,
		  password: this.state.password,
		};
		// send to firebase
	
	};

    render() {
		if (this.state.registrationSuccess == true) {
			return (
			  <View
				style={{
				  flex: 1,
				  backgroundColor: '#307ecc',
				  justifyContent: 'center',
				}}>
				<Image
				  source={require('../img/success.png')}
				  style={{
					width: '50%',
					height: 100,
					resizeMode: 'contain',
					alignSelf: 'center',
					margin: 30,
				  }}
				/>
				<Text style={styles.successTextStyle}>
				  Sign Up Successful!
				</Text>
				<TouchableOpacity
				  style={globalStyle.buttonStyle}
				  activeOpacity={0.5}
				  onPress={() => this.props.navigation.navigate('LoginScreen')}>
				  <Text style={globalStyle.buttonTextStyle}>Login Now</Text>
				</TouchableOpacity>
			  </View>
			);
		}
        return (
			<View style={globalStyle.mainBody}>
				{this.state.loading  &&
					<ActivityIndicator
					animating={this.state.loading}
					color="#000000"
					size="large"
					style={styles.activityIndicator}
					/> }
				<ScrollView
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{
					justifyContent: 'center',
					alignContent: 'center',
					}}>
					<View style={{alignItems: 'center'}}>
					<Image
						source={require('../img/nfty_logo.png')}
						style={{
						width: '50%',
						height: 100,
						resizeMode: 'contain',
						margin: 30,
						}}
					/>
					</View>
					<KeyboardAvoidingView enabled>
					<View style={globalStyle.SectionStyle}>
						<TextInput
						style={globalStyle.inputStyle}
						onChangeText={text => this.setState({ userName: text })}
						underlineColorAndroid="#f000"
						placeholder="Enter Name"
						placeholderTextColor="#8b9cb5"
						autoCapitalize="sentences"
						returnKeyType="next"
						blurOnSubmit={false}
						/>
					</View>
					<View style={globalStyle.SectionStyle}>
						<TextInput
						style={globalStyle.inputStyle}
						onChangeText={text => this.setState({ userEmail: text })}
						underlineColorAndroid="#f000"
						placeholder="Enter Email"
						placeholderTextColor="#8b9cb5"
						keyboardType="email-address"
						returnKeyType="next"
						blurOnSubmit={false}
						/>
					</View>
					<View style={globalStyle.SectionStyle}>
						<TextInput
						style={globalStyle.inputStyle}
						onChangeText={text => this.setState({ password: text })}
						underlineColorAndroid="#f000"
						placeholder="Enter Password"
						placeholderTextColor="#8b9cb5"
						returnKeyType="next"
						secureTextEntry={true}
						blurOnSubmit={false}
						/>
					</View>
					{this.state.errortext != '' ? (
						<Text style={globalStyle.errorTextStyle}>
						{this.state.errortext}
						</Text>
					) : null}
					<TouchableOpacity
						style={globalStyle.buttonStyle}
						activeOpacity={0.5}
						onPress={this.handleSubmit}>
						<Text style={globalStyle.buttonTextStyle}>SIGN UP</Text>
					</TouchableOpacity>
					<Text
                    style={globalStyle.registerTextStyle}
                    onPress={() => this.props.navigation.navigate('LoginScreen')}>
                    Have an account? Login
                  </Text>
					</KeyboardAvoidingView>
				</ScrollView>
				</View>
        )
    }
}

const styles = StyleSheet.create({
	activityIndicator: {
	  alignItems: 'center',
	  height: 80,
	},
	successTextStyle: {
		color: 'white',
		textAlign: 'center',
		fontSize: 18,
		padding: 30,
	  },
  });

export default SignUpScreen;