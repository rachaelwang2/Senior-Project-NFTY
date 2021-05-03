import React , {Component} from 'react';
import Navigator from './views/screens';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from "react-redux";
import store from "./redux/store";

class App extends Component {
  
  render(){
    
  return (
    <Provider store={store}>
      <NavigationContainer >
          <Navigator />
        </NavigationContainer >
    </Provider>
  );
  }
}

export default App;