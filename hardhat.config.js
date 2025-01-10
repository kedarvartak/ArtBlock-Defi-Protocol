require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    lineaSepolia: {
      url: "https://rpc.sepolia.linea.build",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 59141
    }
  }
};