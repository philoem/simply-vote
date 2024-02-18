import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-ethers"
import '@primitivefi/hardhat-dodoc'
import "@nomicfoundation/hardhat-toolbox"
import "hardhat-gas-reporter"
require("@nomicfoundation/hardhat-chai-matchers")
require('hardhat-storage-layout')
require('dotenv').config()

const { INFURA_API_KEY, ETHERSCAN_API_KEY, COINMARKETCAP_API_KEY } = process.env;
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          outputSelection: {
            "*": {
              "*": ["storageLayout"],
            },
          },
        },
      }
    ]
  },  
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "EUR",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  dodoc: {
    runOnCompile: true,
    debugMode: true,
    include: [],
    // More options...
  },
  mocha: {
    timeout: 500000,
  }
};

export default config;
