import React, { Component } from 'react';
import {ActivityIndicator, View, ScrollView, StyleSheet, Image, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {globalStyle} from "./global-style";
import { connect } from "react-redux";
import {
	signupUser
} from "../../redux/actions/ActionCreators";
  
  const mapDispatchToProps = (dispatch) => ({
	signupUser: (email, password, fullname) => dispatch(signupUser(email, password, fullname))
  });

  const mapStateToProps = (state) => {
	return {
	  auth: state.auth,
	};
  };
  

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

	componentDidUpdate(prevProps) {
		if (this.props.auth.signup !== prevProps.auth.signup) {
			if (this.props.auth.signup) {
				this.setState({ registrationSuccess: true })
			}
		}
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
		if (!this.state.password) {
		  alert('Please fill Password');
		  return;
		}
		//this.setState({ loading: true })
		this.props.signupUser(this.state.userEmail, this.state.password, this.state.userName)
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
                    Have an account ? Login
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);