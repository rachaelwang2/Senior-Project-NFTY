import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text, TextInput, Button, Alert, 
  Keyboard, KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import {globalStyle, AppStyles} from "./global-style";

class LoginScreen extends Component {
	constructor(props){
		super(props);
    this.state = {
      email: "",
      password: "", 
      loading: false, 
      errortext: ""
    };
    this.onPressLogin = this.onPressLogin.bind(this);
	}

  onPressLogin = () => {
    this.setState({ errortext: '' })
    if (!this.state.email) {
      alert('Please fill Email');
      return;
    }
    const { email, password } = this.state;
    if (!this.state.password) {
      alert('Please fill Password');
      return;
    }
    // check if user id is in firestore collection, if so put in async storage

  };

    render() {
        return (
            // <KeyboardAvoidingView style={globalStyle.containerView} behavior="padding">
            //   <View style={globalStyle.container}>
            //     <View style={globalStyle.InputContainer}>
            //     <Text style={[globalStyle.title, globalStyle.leftTitle]}>Login</Text>
            //       <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={globalStyle.body} />
            //       <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={globalStyle.body} secureTextEntry={true}/>
            //       <Button
            //         containerStyle={globalStyle.loginContainer}
            //         style={globalStyle.loginText}
            //         onPress={() => this.onLoginPress()}
            //         title="Login"
            //       />
            //     </View>
            //   </View>
            // </KeyboardAvoidingView>

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
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <View>
                <KeyboardAvoidingView enabled>
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
                  <View style={globalStyle.SectionStyle}>
                    <TextInput
                      style={globalStyle.inputStyle}
                      onChangeText={text => this.setState({ email: text })}
                      placeholder="Enter Email" 
                      placeholderTextColor="#8b9cb5"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      returnKeyType="next"
                      // onSubmitEditing={() =>
                      //   passwordInputRef.current &&
                      //   passwordInputRef.current.focus()
                      // }
                      underlineColorAndroid="#f000"
                      blurOnSubmit={false}
                    />
                  </View>
                  <View style={globalStyle.SectionStyle}>
                    <TextInput
                      style={globalStyle.inputStyle}
                      onChangeText={text => this.setState({ password: text })}
                      placeholder="Enter Password"
                      placeholderTextColor="#8b9cb5"
                      keyboardType="default"
                      // ref={passwordInputRef}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      secureTextEntry={true}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
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
                    onPress={() => this.onPressLogin()}>
                    <Text style={globalStyle.buttonTextStyle}>LOGIN</Text>
                  </TouchableOpacity>
                  <Text
                    style={globalStyle.registerTextStyle}
                    onPress={() => this.props.navigation.navigate('SignUpScreen')}>
                    New Here ? Register
                  </Text>
                </KeyboardAvoidingView>
              </View>
            </ScrollView>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  facebookButtonStyle: {
    backgroundColor: AppStyles.color.facebook,
    borderWidth: 0,
    color: '#000000',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  facebookButtonTextStyle: {
    color: AppStyles.color.white,
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default LoginScreen;