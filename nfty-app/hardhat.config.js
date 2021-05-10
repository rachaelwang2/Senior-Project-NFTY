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
      accounts: [{"privateKey":"0x73cc52451a2342f7744bbbab3967111cc1bcf0b81169e7372d74ff241ce5ca2c","balance":"1000000000000000000000"},{"privateKey":"0xfccdfefb959c43a480610afb4d5c08dec96e0e0a750d60defe01b8f5db1d46ed","balance":"1000000000000000000000"},{"privateKey":"0xf0ba51718ffaf57c424fa885ed65e8b167fa0dcef4e41b527c0131759b82b948","balance":"1000000000000000000000"},{"privateKey":"0x9ffe252fffe3c039cde19b67c01baa858df5ad0c69faf7943208e2276df0f2be","balance":"1000000000000000000000"},{"privateKey":"0x10fd92fb022b6925ab718c67f719dab2a0e3d668e038c6c18bc8a22515b2ce51","balance":"1000000000000000000000"},{"privateKey":"0x8fc724f2448c93ea44bf72d5913c5d5085fe9d2e294d240c75ffc81bbdcc9005","balance":"1000000000000000000000"},{"privateKey":"0x0b36e586d915b3fd5fb3560b198af981104221416427289ebc5cc8435c856640","balance":"1000000000000000000000"},{"privateKey":"0x2a2739dad57ef716ac2657b0e1bd9d770005a125a836491ebc37cc8180203815","balance":"1000000000000000000000"},{"privateKey":"0xe3f908aee13075ac10b8266cd6c411ed41488d56e17bbb6bf70f3e32daa37d72","balance":"1000000000000000000000"},{"privateKey":"0x5f94f5f0b9f6193ff3ee58344d2acd0ef02ddb4339a7f4389165acd6bbdc6d5c","balance":"1000000000000000000000"}]
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};
