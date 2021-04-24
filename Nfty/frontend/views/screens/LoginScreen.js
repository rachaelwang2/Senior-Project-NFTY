import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text, TextInput, Button, Alert, 
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyle} from "./global-style";

class LoginScreen extends Component {
	constructor(props){
		super(props);
	}
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
                      // onChangeText={(UserEmail) =>
                      //   setUserEmail(UserEmail)
                      // }
                      placeholder="Enter Email" //dummy@abc.com
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
                      // onChangeText={(UserPassword) =>
                      //   setUserPassword(UserPassword)
                      // }
                      placeholder="Enter Password" //12345
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
                  {/* {errortext != '' ? (
                    <Text style={globalStyle.errorTextStyle}>
                      {errortext}
                    </Text>
                  ) : null} */}
                  <TouchableOpacity
                    style={globalStyle.buttonStyle}
                    activeOpacity={0.5}
                    // onPress={handleSubmitPress}
                    >
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

const localStyle = StyleSheet.create({
	logoText: {
		fontSize: 20
	},
});

export default LoginScreen;