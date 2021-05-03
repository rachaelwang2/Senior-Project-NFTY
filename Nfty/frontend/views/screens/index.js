import React from 'react';
import {StyleSheet } from 'react-native';
import localhost from 'react-native-localhost';
import { expo } from '../../../app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import {connect} from "react-redux"
import DrawerNavigationRoutes from './DrawerNavigationRoutes';
import WalletConnectScreen from './WalletConnectScreen';

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
  componentDidMount() {}

  render() {
    return (
        <Stack.Navigator initialRouteName="WelcomeScreen">
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

const mapDispatchToProps = (dispatch) => {
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