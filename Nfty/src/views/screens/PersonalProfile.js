import React, { Component } from 'react';
import {ActivityIndicator, SafeAreaView, View, StyleSheet, Image, Text, Button, TouchableOpacity} from 'react-native';
// import { connect } from "react-redux";
// import {globalStyle, AppStyles} from "./global-style";
// import {uploadImage, getUploadedImages} from "../../redux/actions/ActionCreators";
// import { Svg } from 'react-native-svg'

export default class App extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Image
          source = {{
            width: 20,
            height: 20,
            alignSelf: 'right',
            uri: "NftyProfile\assets\logo.png"
          }}
        />
        <Text style={{fontSize: 20, fontWeight: "900", alignSelf:'left', marginBottom:20}}>Poppy Seda</Text>

        <View
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          }}
        />
        <Text style={{fontWeight: "bold", alignSelf:'left', marginBottom:20}}>My NFTs</Text>

        <View style={{flexDirection:'row', margin:20, justifyContent:"space-around"}}>
        <Image
          source = {{
            width: 200,
            height: 200,
            uri: "http://picsum.photos/200/300"
            //replace with image URL from the database
          }}
        />
        <Image
          source = {{
            width: 200,
            height: 200,
            uri: "http://picsum.photos/200/300"
            //replace with image URL from the database
          }}
        />
        </View>
        <View
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          }}
        />
        <Text style={{fontWeight: "bold", alignSelf:'left', marginBottom:20}}>My Stylized Images</Text>

        <View style={{flexDirection:'row', margin:20, justifyContent:"space-around"}}>
          <Image
            source = {{
              width: 200,
              height: 200,
              uri: "http://picsum.photos/200/300"
              //replace with image URL from the database
            }}
          />  
          <Image
            source = {{
              width: 200,
              height: 200,
              uri: "http://picsum.photos/200/300"
              //replace with image URL from the database
            }}
          />
        </View>
        <Text>
          <Text>{ this.addPadding() }</Text>
          <Text>
             <Text style={{fontWeight: "bold"}}></Text>{"\n"}
          </Text>      
        </Text>
        <Text
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          }}
        >Settings</Text>
        <Text
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          }}
        >About</Text>
        <Text
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          }}
        >Log out</Text>
      </View>

      
    );
  }

addPadding() {
    const padding = Array.apply(null, Array(16)).map(() => '').join('');
    return Array.apply(null, Array(8)).map(() => padding + '\n');
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 40,
  },

  image: {
    width: 200,
    height: 200,
    position: 'absolute',
  },
});
