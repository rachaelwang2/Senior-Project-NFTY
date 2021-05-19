import {HARDHAT_PORT, HARDHAT_PRIVATE_KEY, HOST_ADDRESS} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWalletConnect, withWalletConnect } from '@walletconnect/react-native-dapp';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import localhost from 'react-native-localhost';
import Web3 from 'web3';

import { expo } from '../../../app.json';
import Hello from '../../../artifacts/contracts/Hello.sol/Hello.json';
import NFTSimple from '../../../artifacts/contracts/NFT.sol/NFT.json';

import { signOutUser, uploadImage, getUploadedImages } from "../../redux/actions/ActionCreators";
import { auth } from "../../firebase/config"


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

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  // eslint-disable-next-line react-native/no-color-literals
  white: { backgroundColor: 'white' },
});

const shouldDeployContract = async (web3, abi, data, from) => {
  const deployment = new web3.eth.Contract(abi).deploy({ data });
  const gas = await deployment.estimateGas();
  const {
    options: { address: contractAddress },
  } = await deployment.send({ from, gas });
  return new web3.eth.Contract(abi, contractAddress);
};

function WalletConnectScreen(props): JSX.Element {
  var state = {
      animating: true,
      image: null,
      image_name: undefined,
      uploaded_img: null,
  }
  const connector = useWalletConnect();
  const [message, setMessage] = React.useState('Loading...');
  const web3 = React.useMemo(
    () => new Web3(new Web3.providers.HttpProvider(`http://${HOST_ADDRESS}:${HARDHAT_PORT}`)),
    [HARDHAT_PORT]
  );
  React.useEffect(() => {
    (async () => {
      const { address } = await web3.eth.accounts.privateKeyToAccount(HARDHAT_PRIVATE_KEY);
      const contract = await shouldDeployContract(
        web3,
        Hello.abi,
        Hello.bytecode,
        address
      );
      setMessage(await contract.methods.sayHello('React Native').call());
    })();
  }, [web3, shouldDeployContract, setMessage, HARDHAT_PRIVATE_KEY]);
  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);
  const signTransaction = React.useCallback(async () => {
    try {
       await connector.signTransaction({
        data: '0x',
        from: '0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3',
        gas: '0x9c40',
        gasPrice: '0x02540be400',
        nonce: '0x0114',
        to: '0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359',
        value: '0x00',
      });
    } catch (e) {
      console.error(e);
    }
  }, [connector]);
  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  const createNft = React.useCallback(async () => {
    try{
      await connector.signTransaction({
        data: '0x',
        from: '0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3',
        gas: '0x9c40',
        gasPrice: '0x02540be400',
        nonce: '0x0114',
        to: '0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359',
        value: '0x00',
      });
    } catch (e) {
      console.error(e);
    }
  }, [connector]);

  const signOut =  signOutUser(); 
  const upload = React.useCallback(()=> {
    try {
      console.log("uploading image");
      console.log(state.filename);
      uploadImage(state.image, state.filename);

    } catch (e) {
      console.error(e);
    }
    
  });
  const handleChange = e => {
    if (e.target.files[0]) {
      const img = e.target.files[0];
      let name = img.name
      const filename = name.substring(0, img.name.indexOf('.'));
      state.image = img;
      state.filename = filename;
      // state(() => ({ image: img, image_name: filename }));
    }
  };

  return (
    //<View style={[StyleSheet.absoluteFill, styles.center, styles.white]}>
    <View
      style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      }}>
      <Text testID="tid-message">{message}</Text>
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet}>
          <Text>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <TouchableOpacity onPress={signTransaction}>
            <Text>Sign a Transaction</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={killSession}>
            <Text>Kill Session</Text>
          </TouchableOpacity>
        </>
      )}

	<TouchableOpacity onPress={signOut}>
	  <Text>Sign Out</Text>
	</TouchableOpacity>
  {uploadButton}
  <TouchableOpacity onPress={upload}>
    <Text>Create NFT</Text>
  </TouchableOpacity>
  {/* <TouchableOpacity
    onPress={() => this.props.navigation.navigate('ProfileScreen')}>
    <Text>Go to Profile</Text>
  </TouchableOpacity> */}
    </View>
  );
}

const { scheme } = expo;

function uploadButton(){
  if(Platform.OS === 'web') {
    return <input type="file" onChange={handleChange} />;
  } else {
    return {};
  }
}
 

class Wallet extends Component{
  constructor(props){
    super(props);
    this.state = {
      animating: true,
      image: null,
      image_name: undefined,
      uploaded_img: null,
    }
    this.callUpload = this.callUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = e => {
    if (e.target.files[0]) {
      const img = e.target.files[0];
      let name = img.name
      const filename = name.substring(0, img.name.indexOf('.'));
      this.setState(() => ({ image: img, image_name: filename }));
    }
  };

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

  callUpload = () => {
    if (!this.state.image) {
      alert("Select an image for upload.")
    }
    this.props.uploadImage(this.state.image, this.state.image_name)
  }
  render() {
    return (
      <WalletConnectScreen animating='true' image='null' image_name='undefined' uploaded_img='null' profile={this.props.profile}/>
      );
  }
}

export default withWalletConnect(WalletConnectScreen, {
  redirectUrl: Platform.OS === 'web' ? window.location.origin : `${scheme}://`,
  storageOptions: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
});
