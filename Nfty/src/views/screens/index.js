import React from 'react';
import {StyleSheet } from 'react-native';
import localhost from 'react-native-localhost';
import { expo } from '../../../app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './PersonalProfile';
import PhotoUpload from './PhotoUpload';
import {connect} from 'react-redux';
import DrawerNavigationRoutes from './DrawerNavigationRoutes';
import WalletConnectScreen from './WalletConnectScreen';
import {attemptLogin} from '../../redux/actions/ActionCreators';
import photo_upload from './PhotoUpload';
import camera_image from './CameraImage';

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
    this.props.attemptLogin()
  } 

  render() {
    return (
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen 
            name = "ProfileScreen"
            component = {ProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name = "PhotoUpload"
            component = {photo_upload}
            options={{headerShown: false}}
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
            name="WalletConnectScreen"
            component={WalletConnectScreen}
            // Hiding header for Welcome Screen
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            // Hiding header for Welcome Screen
            options={{
              title: 'Submit a Work', //Set Header Title
              headerStyle: {
                backgroundColor: '#000000', //Set Header color
              },
              headerTintColor: '#ffffff',
            }}
          />
          <Stack.Screen
            name="CameraImage"
            component= {camera_image}
            // Hiding header for Welcome Screen
            options={{headerShown: false}}
          />
          {/* Navigation Drawer as a landing page */}
          {/* <Stack.Screen
            name="DrawerNavigationRoutes"
            component={DrawerNavigationRoutes}
            // Hiding header for Navigation Drawer
            options={{headerShown: false}}
          /> */}

        </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);

// const RouterNav = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="WelcomeScreen">
//         <Stack.Screen
//           name="WelcomeScreen"
//           component={WelcomeScreen}
//           // Hiding header for Welcome Screen
//           options={{headerShown: false}}
//         />
//         {/* Auth Navigator: Include Login and Signup */}
//         <Stack.Screen
//           name="Auth"
//           component={Auth}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="WalletConnectScreen"
//           component={WalletConnectScreen}
//           // Hiding header for Welcome Screen
//           options={{headerShown: false}}
//         />
//         {/* Navigation Drawer as a landing page */}
//         {/* <Stack.Screen
//           name="DrawerNavigationRoutes"
//           component={DrawerNavigationRoutes}
//           // Hiding header for Navigation Drawer
//           options={{headerShown: false}}
//         /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default RouterNav;