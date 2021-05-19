import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text, Button, TouchableOpacity} from 'react-native';
import { connect } from "react-redux";
import {globalStyle, AppStyles} from "./global-style";
import {uploadImage, getUploadedImages} from "../../redux/actions/ActionCreators";
import { Svg } from 'react-native-svg'


class ProfileScreen extends Component {
  constructor(props){
		super(props);
		this.state = {
		}
    this.Inputfield = this.Inputfield.bind(this)
    this.TabButton = this.TabButton.bind(this)
    this.Code = this.Code.bind(this)
	}

  Inputfield () {
    return (
      <View style={InputfieldStyles.Inputfield}>
        <View style={InputfieldStyles.Shape} />
        <Text style={InputfieldStyles.Label}>
          Figma URL:
        </Text>
        <Text style={InputfieldStyles.Value}>
          https://www.figma.com/file/qosbLLy02hcWkJDEcodamN
        </Text>
      </View>
    )
  }

   Generate_button () {
    return (
      <View style={ButtonStyles.Button}>
        <Text style={ButtonStyles.Label}>
          Generate
        </Text>
      </View>
    )
  }

   TabButton () {
    return (
      <View style={TabButtonStyles.TabButton}>
        <View style={TabButtonStyles.Shape} />
        <Text style={TabButtonStyles.Label}>
          React Web
        </Text>
      </View>
    )
  }

   Code () {
    return (
      <View style={CodeStyles.Code}>
        <View style={CodeStyles.Rectangle1} />
        <Text style={CodeStyles.Outputcode}>
          Text
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={Profile.FigmatoReact}>
        <Text style={Profile.Title}>
          Profile Page
        </Text>
        {this.Inputfield()}
        <Button />
        <View style={Profile.TabMenu}>
          {this.TabButton()}
          {this.TabButton()}
          {this.TabButton()}
        </View>
        {this.Code()}
      </View>
    )
  }
}

  const InputfieldStyles = StyleSheet.create({
    Inputfield: {
      width: 945,
      height: 83,
      margin: '167 213',
    },
    Shape: {
      width: '76.08%',
      height: '100%',
      borderRadius: 8,
      margin: '226 0',
      backgroundColor: '#ffffff',
      borderColor: '#888888',
      borderWidth: 2,
    },
    Label: {
      width: 216,
      height: 48,
      color: '#000000',
      fontFamily: 'Inter, sans-serif',
      fontSize: 40,
      fontWeight: '500',
      lineHeight: 46.875,
      textAlign: 'right',
    },
    Value: {
      width: '115.34%',
      height: '57.83%',
      margin: '246 17',
      color: '#000000',
      fontFamily: 'Inter, sans-serif',
      fontSize: 40,
      fontWeight: '500',
      lineHeight: 46.875,
    },

  })

  const Profile = StyleSheet.create({
    FigmatoReact: {
      backgroundColor: '#f9f9f9',
    },
    Title: {
      width: 643,
      height: 109,
      margin: '318 60',
      color: '#000000',
      fontFamily: 'Inter, sans-serif',
      fontSize: 90,
      fontWeight: '500',
      lineHeight: 105.46875,
      textAlign: 'center',
    },
    TabMenu: {
      width: 990,
      height: 84,
      margin: '144 517',
    },
  
  })

  const ButtonStyles = StyleSheet.create({
    Button: {
      width: 450,
      height: 120,
      borderRadius: 16,
      margin: '417 321',
      backgroundColor: '#2d9cdb',
    },
    Label: {
      width: '40%',
      height: '40%',
      margin: '135 36',
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      fontSize: 40,
      lineHeight: 46.875,
      textAlign: 'center',
      textAlignVertical: 'center',
    },

  })

  const CodeStyles = StyleSheet.create({
    Code: {
      width: 990,
      height: 422,
      margin: '144 601',
    },
    Rectangle1: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
      backgroundColor: '#ffffff',
      borderColor: '#dddddd',
      borderWidth: 1,
    },
    Outputcode: {
      width: '95.56%',
      height: '6.87%',
      margin: '23 24',
      color: '#000000',
      fontFamily: 'Inter, sans-serif',
      fontSize: 24,
      lineHeight: 28.125,
    },

  })

  const TabButtonStyles = StyleSheet.create({
    TabButton: {
      width: 330,
      height: 84,
    },
    Shape: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
      backgroundColor: '#eeeeee',
      borderColor: '#000000',
      borderWidth: 2,
    },
    Label: {
      width: '100%',
      height: '57.14%',
      color: '#000000',
      fontFamily: 'Inter, sans-serif',
      fontSize: 40,
      lineHeight: 46.875,
      textAlign: 'center',
      textAlignVertical: 'center',
    },

  })

export default ProfileScreen;



// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text numberOfLines={1} on>

//       </Text>

//     </SafeAreaView>

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   },
// }); 