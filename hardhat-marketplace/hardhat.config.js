require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/U7gcG3zjWQlp5XJ4peWMGrtVIaCP7lW0", // Alchemy endpoint
      accounts: ["0x606b37f399e43e2e534c9dd1e959c8191a3716ac5b29c156101e2d781897f037"], // Replace YOUR_PRIVATE_KEY_HERE with your actual private key
      chainId: 11155111,
    }
  }
};
