import React, { Component } from 'react';
import {ActivityIndicator, SafeAreaView, View, ScrollView, StyleSheet, Image, Text, Button, TouchableOpacity, Platform} from 'react-native';
// import { connect } from "react-redux";
// import {globalStyle, AppStyles} from "./global-style";
import { connect } from "react-redux";
import {uploadImage, getUploadedImages} from "../../redux/actions/ActionCreators";
// import { Svg } from 'react-native-svg'

const mapDispatchToProps = (dispatch) => ({
	uploadImage: (path, filename) => dispatch(uploadImage(path, filename)),
	getUploadedImages: () => dispatch(getUploadedImages())
  });

  const mapStateToProps = (state) => {
	return {
	  auth: state.auth,
	  profile: state.profile
	};
};

class ProfileScreen extends Component {
  constructor(props){
		super(props);
		this.state = {
			animating: true,
			image: null,
			image_name: undefined,
			uploaded_img: null,
		}
	}

	componentDidMount() {
		if (this.props.profile.images === undefined || this.props.profile.images.length == 0) {
			this.props.getUploadedImages()
		}
		this.props.profile.images.forEach((img) => {
			console.log(img)
			console.log(img.imageUrl)
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.profile.img !== prevProps.profile.img) {
			if(this.props.profile.img ) {
				this.setState({uploaded_img: this.props.profile.img})
			}
		}
	}

  render() {
    return (
      <View style={styles.main}>
        <Text>{ this.addSmallPadding() }</Text>
        <Image
          source={require('../img/nfty_logo.png')}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Text style={{fontSize: 20, fontWeight: "900", alignSelf:'center', marginBottom:20}}>{this.props.auth.user.displayName}</Text>

        <View
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          }}
        />
        <Text style={{fontWeight: "bold", alignSelf:'center', marginBottom:20}}>My NFTs</Text>
        {Platform.OS === 'web' && (
					<ScrollView>
          {this.props.profile.images.map((image) =>
          <View>
          <Image
            source={{uri: image.imageUrl}}
            style={{
              width: 200,
              height: 200,
              padding: 20,
              margin: 20,
              alignSelf: 'center',
            }}
          />
          <Text style={{fontWeight: "bold", alignSelf:'center', marginBottom:20}}>Transaction Hash: {image.blockchainHash}</Text>
          </View>
          )}
        </ScrollView>
				)}
				{!(Platform.OS === 'web') && (
					<View style = {{height: 350}}>
          <ScrollView>
            {this.props.profile.images.map((image) =>
            <View>
            <Image
              source={{uri: image.imageUrl}}
              style={{
                width: 200,
                height: 200,
                padding: 20,
                margin: 20,
                alignSelf: 'center',
              }}
            />
            <Text style={{fontWeight: "bold", alignSelf:'center', marginBottom:20}}>Transaction Hash: {image.blockchainHash}</Text>
            </View>
            )}
          </ScrollView>
        </View>
				)}
        <View
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          }}
        />
        <Text>
          <Text>{ this.addPadding() }</Text>
          <Text>
             <Text style={{fontWeight: "bold"}}></Text>{"\n"}
          </Text>      
        </Text>
      </View>

      
    );
  }

addPadding() {
    const padding = Array.apply(null, Array(16)).map(() => '').join('');
    return Array.apply(null, Array(8)).map(() => padding + '\n');
  }

addSmallPadding() {
  const padding = Array.apply(null, Array(8)).map(() => '').join('');
  return Array.apply(null, Array(4)).map(() => padding + '\n');
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  image: {
    width: 200,
    height: 200,
    position: 'absolute',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
