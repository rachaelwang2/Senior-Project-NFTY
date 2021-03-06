/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ganache");
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");
require("@nomiclabs/hardhat-ethers");


const { HARDHAT_PORT, ROPSTEN_PRIVATE_KEY, ALCHEMY_API_KEY } = process.env;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.0"
      },
      {
        version: "0.8.0",
        settings: { } 
      },
    ]
  },
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      chainId: 3,
      accounts: [{"privateKey":"0x0c07142406119b6f26beec65c1332d9304ccce1ee0e7829c9802dced0185fe6d","balance":"1000000000000000000000"},{"privateKey":"0xdce2399f1e2c620baf6c0b470bbe74fe03607359f2bdbbd4f5e45de5e8143a08","balance":"1000000000000000000000"},{"privateKey":"0xa53a950e3c033c36b81238e2136e7f93ca797280f840f4d7d1f9a83b783570f7","balance":"1000000000000000000000"},{"privateKey":"0x5a7b1a248ba3f9cd57430840c8c4fac60dfae198d2fa8ed960d2c8f782d5fe7a","balance":"1000000000000000000000"},{"privateKey":"0xf09e527b5f2ac8bf7ec1ccfb4c8a0ea8f73fb11853af1f1ee5651d63f358eca6","balance":"1000000000000000000000"},{"privateKey":"0xe26fcbf31d9b067f753f2155c449c42e7f2725376f7fd951d410f48d6251a6f2","balance":"1000000000000000000000"},{"privateKey":"0xfaa7c14cf17ed775d6a1ba01d02ad662387e362f14dab5cda8dd2cfe004d5b12","balance":"1000000000000000000000"},{"privateKey":"0xcdf3e78412c15ef224fdd1bb7253875fe847e289399e8655bcb02181d1d42ec5","balance":"1000000000000000000000"},{"privateKey":"0x74f29b8c48e8af9f2b0f71b02d09e1d18406e66664b7d88b54b093777a74f080","balance":"1000000000000000000000"},{"privateKey":"0x144934f7f9c4230f08bca4ce628084a7d288a16699bb64b64087466c1a16e84d","balance":"1000000000000000000000"}]
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/124IV9lnccOe5WGemFFqps7iLpzbCuT8`,
      accounts: [`0xbffa6ced3da1080e210f2a11c8c4c4b10e60fe3a0db3bf5f60260aea162a4d97`]
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};
