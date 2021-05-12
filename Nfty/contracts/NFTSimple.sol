pragma solidity 0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTSimple is ERC721 {
	uint public nextTokenId;
	address public admin;

	constructor() ERC721('Nfty', 'NFT') {
		admin = msg.sender;
	}

	VRFCOonsumerBase(_VRFCoordinator, _LinkToken)
	ERC721()
	function mint(address to) external {
		require(msg.sender == admin, 'only admin'):
		_safeMint(to, nextTokenId);
		nextTokenId++;
	}

	function _baseURI() internal view override returns (string memory) {
		return "http://0.0.0.0:8545/";
	}
}
