import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  // solidity: "0.8.17",
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ]
  }
  // networks: {
  //   baseGoerli: {
  //     url: "https://goerli.base.org/",
  //     chainId: 84531,
  //     accounts: ['0xPrivateKey'],
  //   },
  //   baseETH: {
  //     url: "https://mainnet.base.org/",
  //     chainId: 8453,
  //     accounts: ['0xPrivateKey'],
  //   }
  // },
};

export default config;
