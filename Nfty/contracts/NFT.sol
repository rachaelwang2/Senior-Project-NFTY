// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
  uint256 public nextTokenId;
  address public admin;
  string[] public nfts; 
  mapping(bytes32 => address) public requestIdToSender;
  mapping(bytes32 => string) public requestIdToTokenUri;

  //baseUri is the url to the server url for https requests
  //Firebase development environment after running firebase emulators:start --only functions
  //http://localhost:5001/nfty-dc26a/
  constructor(string memory myBaseURI) ERC721('My NFT', 'NFT') public {
    admin = msg.sender;
    nextTokenId = 0;
    _setBaseURI(myBaseURI);
    console.log(baseURI());
  }

  function createNFT(string memory tokenURI) public returns (bytes32) {
    console.log("Creating NFT for %s.", msg.sender);
    console.log("tokenURI is %s", tokenURI);
    address nftOwner = msg.sender;
    _setTokenURI(nextTokenId, tokenURI);
    _safeMint(msg.sender, nextTokenId);
    nextTokenId++
  }

  function sayHello(string memory name) public view returns(string memory) {
    console.log("Saying hello to %s!", msg.sender);
    return string(abi.encodePacked("Welcome to ", name, defaultSuffix));
  }

}
