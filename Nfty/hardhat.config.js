/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const { HARDHAT_PORT } = process.env;

module.exports = {
  solidity: "0.7.3",
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      accounts: [{"privateKey":"0xb072ffe9330a9b41326f38d42881b2b4a3d68aaeba9e25b5a3ae99215b339233","balance":"1000000000000000000000"},{"privateKey":"0x0970fa01a81c7339d2b3eec08924fa1f5b43a79bc52c42f15679c8618bfd35d0","balance":"1000000000000000000000"},{"privateKey":"0x50589f541619139c5fa39c8cf27c216dee553a16dd80dda2c0f6dfaaa89d1136","balance":"1000000000000000000000"},{"privateKey":"0xf6f1b20d80664cb30ac8fd60345305667e2a49f1286f887388ff0f40bf8f5897","balance":"1000000000000000000000"},{"privateKey":"0xbd5a7539e5635b0655a1cca5f623c64f67e5b45fa7247b4d4febf46c771ae5dd","balance":"1000000000000000000000"},{"privateKey":"0xa119533fde8d38731b225849aafc5236e3951fcf93a8b667a3fb449a1a3b8a12","balance":"1000000000000000000000"},{"privateKey":"0x2a24c61c200f6e5281e9a2a4bb0d2df2c7abd7919c832b914e2edc9edbb00e5f","balance":"1000000000000000000000"},{"privateKey":"0x7faf41a7c9f4acc35d7f1d34dd91e807275db80acd226caf3fbac93f798235c1","balance":"1000000000000000000000"},{"privateKey":"0xfa5d21efb78f5768f73e095c26b90a012d7d445879125cdc07f4720df0d9797d","balance":"1000000000000000000000"},{"privateKey":"0xdc61814b1d1c4dcceefc48ea226e945265b585749dc88a5a04a649bf8f5ce9ed","balance":"1000000000000000000000"}]
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};