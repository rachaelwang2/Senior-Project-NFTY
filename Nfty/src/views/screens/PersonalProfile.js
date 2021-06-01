import React, { Component } from 'react';
import {ActivityIndicator, SafeAreaView, View, StyleSheet, Image, Text, Button, TouchableOpacity} from 'react-native';
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
        <Image
          source={require('../img/nfty_logo.png')}
          style={{
            width: 20,
            height: 20,
            resizeMode: 'contain',
            alignSelf: 'center',
            margin: 30,
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
        {this.props.profile.images.map((image) =>
            <img
            src={image.imageUrl}
            height="200"
            width="200"
          />
          )}
        {/* <Image
          source = {{
            width: 200,
            height: 200,
            uri: "http://picsum.photos/200/300"
            //replace with image URL from the database
          }}
        /> */}
        </View>
        <View
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          }}
        />
        {/* <Text style={{fontWeight: "bold", alignSelf:'left', marginBottom:20}}>My Stylized Images</Text>

        <View style={{flexDirection:'row', margin:20, justifyContent:"space-around"}}>
          {this.props.profile.images.map((image) =>
            <img
            src={image.imageUrl}
            height="200"
            width="200"
          />
          )}
          
        </View> */}
        <Text>
          <Text>{ this.addPadding() }</Text>
          <Text>
             <Text style={{fontWeight: "bold"}}></Text>{"\n"}
          </Text>      
        </Text>
        {/* <Text
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          }}
        >Log out</Text> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
