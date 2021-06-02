import {HARDHAT_PORT, HARDHAT_PRIVATE_KEY, HOST_ADDRESS} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {withWalletConnect, useWalletConnect} from '@walletconnect/react-native-dapp';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import localhost from 'react-native-localhost';
import Web3 from 'web3';
import { connect } from "react-redux";

import { expo } from '../../../app.json';
import Hello from '../../../artifacts/contracts/Hello.sol/Hello.json';
import NFT from '../../../artifacts/contracts/NFT.sol/NFT.json';

import { signOutUser, uploadImage, getUploadedImages, deployMetada, registerWallet, web3Provider } from "../../redux/actions/ActionCreators";
import { auth, firebasefunc } from "../../firebase/config"
import {globalStyle, AppStyles} from "./global-style";

const NFT_CONTRACT_ADDRESS = '0xb63e7fFA48CDC7d08DD4C71AD9b7eC10E9ED1342';
const ROPSTEN_PRIVATE_KEY = 'bffa6ced3da1080e210f2a11c8c4c4b10e60fe3a0db3bf5f60260aea162a4d97';

const mapDispatchToProps = (dispatch) => ({
  uploadImage: (path, filename) => dispatch(uploadImage(path, filename)),
  getUploadedImages: () => dispatch(getUploadedImages()),
  signOutUser: () => dispatch(signOutUser()),
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

class WalletConnectScreen extends Component{
  constructor(props){
    super(props);
    const web3 = web3Provider(); //new Web3(new Web3.providers.HttpProvider(`http://localhost:${HARDHAT_PORT}`));
    this.state = {
      animating: true,
      image: null,
      image_name: undefined,
      uploaded_img: null,
      message: 'Loading...',
      web3: web3,
      address: null,
      nftContract: null, 
    };
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

  async componentDidMount(){
   
    console.log(this.state.web3);
    try{
      // const { address }  = await this.state.web3.eth.accounts.privateKeyToAccount(HARDHAT_PRIVATE_KEY);
      const { address }  = await this.state.web3.eth.accounts.privateKeyToAccount(`0x${ROPSTEN_PRIVATE_KEY}`);

      this.setState({address: address});
      const myNftContract = new this.state.web3.eth.Contract(NFT.abi, NFT_CONTRACT_ADDRESS);
      // const myNftContract = await shouldDeployContract(
      //   this.state.web3,
      //   NFT.abi,
      //   NFT.bytecode,
      //   this.state.address
      //   );
    this.setState({nftContract: myNftContract});
    this.props.profile.nftContract = myNftContract;
     // this.setState({nftContract: nftContract});
     // this.setState({address: address});
     // console.log(myNftContract);
     // console.log(this.state.nftContract);

      // this.setState(async () => ({
        // message: await this.state.nftContract.methods.sayHello('React Native').call()}));
     // console.log("Trying to Talk with contract");
     this.state.nftContract.methods.sayHello('the Blockchain').call().then(response => {
       this.setState({
         message: response
       })
     })
   } catch(error){
     console.error(error);
   }
    // if (this.props.profile.images === undefined || this.props.profile.images.length == 0) {
    //   this.props.getUploadedImages()
    // }
    // this.props.profile.images.forEach((img) => {
    //   console.log(img)
    //   console.log(img.imageUrl)
    // });
  }

  componentDidUpdate(prevProps) {

    if (this.props.auth.logged_in !== prevProps.auth.logged_in) {
      if(!this.props.auth.logged_in) {
        this.props.navigation.replace('Auth')
      }
		}
  }

  callUpload =() => {
    //const name =  this.props.auth.user.displayName;
    //const [message, setMessage] = React.useState('Loading...');
    console.log(this.props.profile.wallet);
    //console.log(this.state.nftContract.methods);
    const tokenURI = 'http://localhost:5001/nfty-dc26a/us-central1/get_metadata?tokenId=';
    
    const ethAccount = this.state.web3.eth.accounts.create();
    console.log(ethAccount)
    this.state.nftContract.methods.createNFT(tokenURI).send({from: ''})
      .then( response => {
        console.log(response);
        const tokenId = response.events.Transfer.returnValues.tokenId;
        this.setState({
          message: "NFT created with tokenId:" + String(tokenId)
        })
        this.state.nftContract.methods.tokenURI(tokenId).call()
        .then( response => {
          console.log(response);
        })
      });

 
    // deployMetada({
    //   text: "test",
    //   creator: name,
    //   owner: name,
    //   image_uri: "Image URI goes here!",

    // });
    // var writeMetadata = firebasefunc().httpsCallable('write_metadata');
    // writeMetadata({text: "test"})
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) =>{
    //     console.log(error.message);
    //     var code = error.code;
    //     var message = error.message;
    //     var details = error.details;
    //   });
    // // if (!this.state.image) {
    //   alert("Select an image for upload.")
    // }
    // this.props.uploadImage(this.state.image, this.state.image_name)
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
        <Text testID="tid-message">{this.state.message}</Text>
         <Wallet props={this.props}/>
         <>
           {/* {Platform.OS === 'web' && (
            <>
              <input type="file" onChange={this.handleChange} />
            </>
            )} */}
         </>
         {/* <TouchableOpacity onPress={this.callUpload}>
          <Text>Create NFT</Text>
         </TouchableOpacity> */}
       </View> 
    );
  }
}

function uploadButton(){
  return <input type="file" onChange={handleChange} />;
}

function DeployNft(props){
  const [message, setMessage] = React.useState('Loading...');

}
// const web3 = async () => {
//   return new Web3(new Web3.providers.HttpProvider(`http://localhost:${HARDHAT_PORT}`))
      
// }

function Wallet(props) {
  const connector = useWalletConnect();
  props.props.profile.wallet = connector; 
   const [message, setMessage] = React.useState('Loading...');
  const web3 = React.useMemo(
    () => new Web3(new Web3.providers.HttpProvider(`http://localhost:${HARDHAT_PORT}`)),
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
      setMessage(await contract.methods.sayHello('the blockchain').call());
    })();
  }, [web3, shouldDeployContract, setMessage, HARDHAT_PRIVATE_KEY]);
  
  const connectWallet = React.useCallback(() => {
    const connectedWallet = connector.connect().then(response => {
      props.props.profile.wallet = response;
      registerWallet(response.accounts);
      console.log(response);
    });
    // return connector.connect();
    return connectedWallet;
  }, [connector]);
  const signTransaction = React.useCallback(async () => {
    try {
       await connector.signTransaction({
        data: '0x',
        // from: '0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3',
        from: '0x3276abD7B68736DDa8aBE00188ECb3Dfcbd16ba4',
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
    <>
       <View>
          {!connector.connected && (
            <View>
            <TouchableOpacity onPress={connectWallet} style={globalStyle.homebuttonStyle}>
              <Text style={globalStyle.buttonTextStyle}>Connect a Wallet</Text>
            </TouchableOpacity>
            {/* <Text>You must connect a wallet to be able to create NFTs!</Text> */}
            </View>
          )}
          {!!connector.connected && (
            <>
    
              <TouchableOpacity onPress={signTransaction} style={globalStyle.homebuttonStyle} >
                <Text style={globalStyle.buttonTextStyle}>Sign a Transaction</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={killSession} style={globalStyle.homebuttonStyle}> 
                <Text style={globalStyle.buttonTextStyle}>Kill Session</Text>
              </TouchableOpacity>
            </>
          )}


        <TouchableOpacity style={globalStyle.homebuttonStyle}
          onPress={() => props.props.navigation.navigate('ImageLanding')}>
          <Text style={globalStyle.buttonTextStyle}>Upload Photos</Text>
        </TouchableOpacity>

       
        <TouchableOpacity style={globalStyle.homebuttonStyle}
          onPress={() => props.props.navigation.navigate('ProfileScreen')}>
          <Text style={globalStyle.buttonTextStyle}>Go to Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={props.props.signOutUser} style={globalStyle.homebuttonStyle}>
            <Text style={globalStyle.buttonTextStyle}>Sign Out</Text>
          </TouchableOpacity>
      </View>

  </>

  );
}

const { scheme } = expo;


 



 
export default withWalletConnect(connect(mapStateToProps, mapDispatchToProps)(WalletConnectScreen), {
  redirectUrl: Platform.OS === 'web' ? window.location.origin : `${scheme}://`,
  storageOptions: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
});
