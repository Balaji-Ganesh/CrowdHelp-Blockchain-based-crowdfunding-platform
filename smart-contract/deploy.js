const HDWalletProvider = require("@truffle/hdwallet-provider");

const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

require("dotenv").config();

const provider = new HDWalletProvider(process.env.mnemonic, process.env.link);
console.log("mnemonic: " + process.env.mnemonic);
console.log("link: " + process.env.link);

const web3 = new Web3(provider);
const deploy = async () => {
  console.log("in function");
  const accounts = await web3.eth.getAccounts();
  console.log("Attemping to deploy to accounts ", accounts[0]);

  try {
    const result = await new web3.eth.Contract(
      JSON.parse(compiledFactory.interface)
    )
      .deploy({ data: "0x" + compiledFactory.bytecode })
      .send({ from: accounts[0] })
      .catch((err) => {
        console.error("Error: " + err);
      });

    console.log("Contract deploy to ", result.options.address);
  } catch (error) {
    console.error(error);
  }
};

deploy();
