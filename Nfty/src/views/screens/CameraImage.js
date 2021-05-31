import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { connect } from "react-redux";
import { uploadImage, getUploadedImages } from "../../redux/actions/ActionCreators";

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

class ImagePick extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    console.log(this.props)
    // if (this.props.profile.images === undefined || this.props.profile.images.length == 0) {
    //   this.props.getUploadedImages()
    // }
    // this.props.profile.images.forEach((img) => {
    //   console.log(img)
    //   console.log(img.imageUrl)
    // });
  }
  
  render() {
    return (
       <View
      style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      }}>
         <Image_picker props={this.props}/>
         <>
         </>
       </View> 
    );
  }
}

function Image_picker(props) {

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
      console.log(props);

    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const upload = async () => {
    const response = await fetch(image);
    const blob = await response.blob();
    props.props.uploadImage(blob, "testing1")
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to gallery</Text>;
  }
  return (
    <View style={styles.container}>
    <Button title="Pick Image From Gallery" onPress={() => pickImage()}/>
      {image && 
      <div>
      <Button title="Upload Image" onPress={() => upload()}/>
      <div>
      <Image source ={{uri: image}} style = {{flex: 1}}/>
      </div>
      </div>
      }
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },

});


export default connect(mapStateToProps, mapDispatchToProps)(ImagePick);