import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ProfileScreen from './ProfileScreen';
import {connect} from 'react-redux';
import HomeScreen from './HomeScreen';
import {attemptLogin} from '../../redux/actions/ActionCreators';
import ImageUploadScreen from './ImageUploadScreen';

const mapDispatchToProps = (dispatch) => ({
	attemptLogin: () => dispatch(attemptLogin())
});

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'Login', //Set Header Title
          headerStyle: {
            backgroundColor: '#000000', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          title: 'Sign Up', //Set Header Title
          headerStyle: {
            backgroundColor: '#000000', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

class Navigator extends React.Component {
  
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.attemptLogin();
  } 

  render() {
    return (
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen 
            name = "ProfileScreen"
            component = {ProfileScreen}
            options={{
              title: 'Profile', //Set Header Title
              headerStyle: {
                backgroundColor: '#000000', //Set Header color
              },
              headerTintColor: '#ffffff',
            }}
          />
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            // Hiding header for Welcome Screen
            options={{headerShown: false}}
          />
          {/* Auth Navigator: Include Login and Signup */}
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: 'Home', //Set Header Title
              headerStyle: {
                backgroundColor: '#000000', //Set Header color
              },
              headerTintColor: '#ffffff',
            }}
          />
          <Stack.Screen
            name="ImageUploadScreen"
            component= {ImageUploadScreen}
            options={{
              title: 'Submit a Work', //Set Header Title
              headerStyle: {
                backgroundColor: '#000000', //Set Header color
              },
              headerTintColor: '#ffffff',
            }}
          />

        </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);