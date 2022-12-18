require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config({path:__dirname+'/.env'});
const { API_KEY, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${API_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  },
};
