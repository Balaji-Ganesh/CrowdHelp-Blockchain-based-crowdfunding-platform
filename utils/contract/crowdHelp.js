import web3 from "../web3";
import CrowdHelp from "../../artifacts/contracts/CrowdHelp.sol/CrowdHelp.json"

const crowdHelpContractAddress = "0xB2B305a50121d6acC8c0F8951a6cdb41d3bB0C6D";
const crowdHelp = new web3.eth.Contract(CrowdHelp.abi, crowdHelpContractAddress)


export default crowdHelp;
