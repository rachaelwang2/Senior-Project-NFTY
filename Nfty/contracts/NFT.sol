// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract NFT is ERC721URIStorage {
  uint256 public tokenCounter;
  address public admin;
  string[] public nfts; 
  mapping(bytes32 => address) public requestIdToSender;
  mapping(bytes32 => string) public requestIdToTokenUri;
  // string private baseUri;

  //baseUri is the url to the server url for https requests
  //Firebase development environment after running firebase emulators:start --only functions
  //http://localhost:5001/nfty-dc26a/
  constructor() public ERC721('My NFT', 'NFT') {
    admin = msg.sender;
    tokenCounter = 0;
    // baseUri = myBaseURI;
  }

  function createNFT(string memory tokenURI) public returns (uint256) {
    console.log("Creating NFT for %s.", msg.sender);
    console.log("tokenURI is %s", tokenURI);
    //string memory fullUri = string(abi.encodePacked(baseUri, tokenURI));
    //console.log("Full URI is %s", fullUri);
    _safeMint(msg.sender, tokenCounter);

    _setTokenURI(tokenCounter, tokenURI);
    uint256 currToken = tokenCounter;
    tokenCounter = tokenCounter + 1;
    console.log(tokenCounter);
    return tokenCounter;
  }

  function sayHello(string memory name) public view returns(string memory) {
    console.log("Saying hello to %s!", msg.sender);
    return string(abi.encodePacked("Welcome to ", name, "!"));
  }

  // function setBaseURI(string memory newBaseUri) public view {
  //   baseUri = newBaseUri;
  // }


  

}
