import web3 from "../web3";
import CrowdHelp from "../../artifacts/contracts/CrowdHelp.sol/CrowdHelp.json";

const crowdHelpContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const crowdHelp = new web3.eth.Contract(
  CrowdHelp.abi,
  crowdHelpContractAddress
);

export default crowdHelp;
