require("dotenv").config({ path: __dirname + "/.env.local" }); // When deploying -- be careful about this path..
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");

// console.log(process.env.INFURA_API_KEY);
// console.log(process.env.PRIVATE_KEY);

module.exports = {
  solidity: "0.8.17",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000000,
    },
  },
  mocha: {
    timeout: 90000,
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      blockGasLimit: 18800000,
    },
    goerli_testnet: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x` + process.env.PRIVATE_KEY],
      gasPrice: 1000,
      saveDeployments: true,
      deploy: ["scripts/"],
    },
  },
  namedAccounts: {
    deployer: 0,
  },
};

/**
 * guide: https://docs.palm.io/HowTo/Deploy-using-Hardhat/ - as redirected by Infura (to deploy via HardHat)
 * $ npx hardhat compile
 * $ npx hardhat --network goerli_testnet deploy
Nothing to compile
Contract deployed to address: 0xB2B305a50121d6acC8c0F8951a6cdb41d3bB0C6D
deploying "CrowdHelp" (tx: 0xe7a0301eae21ef759c24c188d2554d538cbe5e11d3ea1b9c6c385862d38df927)...: deployed at 0x5a61c16165e797bb770887F339f9DCb6608dce02 with 2316759 gas
 */
