//from - https://hardhat.org/tutorial/deploying-to-a-live-network.html
// const NFT = require('../artifacts/contracts/NFT.sol/NFT.json');

async function main() {
  
  // const url = "https://eth-ropsten.alchemyapi.io/v2/124IV9lnccOe5WGemFFqps7iLpzbCuT8";
  // const web3 = new Web3(url);
  // const { address } = await web3.eth.accounts.privateKeyToAccount('0xbffa6ced3da1080e210f2a11c8c4c4b10e60fe3a0db3bf5f60260aea162a4d97');
  // console.log(
  //   "Deploying contracts with the account:", 
  //   address
  // );
  // const contract = new web3.eth.Contract(NFT.abi);
  // const deployment = contract.deploy({
  //   data: NFT.bytecode,
  // });
  // const gas = await deployment.estimateGas();

  // const signTransaction = new web3.eth.accounts.signTransaction({
  //   data: NFT.bytecode,
  //   from: address,
  //   gas: gas,
  //   gasPrice:'0x02540be400',
  // }, '0xbffa6ced3da1080e210f2a11c8c4c4b10e60fe3a0db3bf5f60260aea162a4d97');
 
  // const {
  //   options: { address: contractAddress },
  // } = await web3.deployment.send({ from:address, gas:gas }); 
  // const nftContract = new web3.eth.Contract(NFT.abi, contractAddress);
  // console.log("NFT Contract Address:", nftContract.address);
  // console.log(nftContract); 
  
  

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const nftContract = await ethers.getContractFactory("NFT");
  const myContract = await nftContract.deploy();

  console.log("Contract address:", myContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });