require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifiacts'
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      chainId: 1337
    },
    localhost: {
      allowUnlimitedContractSize: true,
      chainId: 1337
    }
  //   matic: {
  //     url: "https://polygon-mumbai.g.alchemy.com/v2/YOUR_APP", // todo
  //     accounts: ["MATIC_PRIVATE_KEY"]
  //   }
  },
};
