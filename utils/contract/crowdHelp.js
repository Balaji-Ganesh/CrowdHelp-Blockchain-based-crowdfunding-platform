import web3 from "../web3";
import CrowdHelp from "../../artifacts/contracts/CrowdHelp.sol/CrowdHelp.json"

const crowdHelpContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const crowdHelp = new web3.eth.Contract(CrowdHelp.abi, crowdHelpContractAddress)


export default crowdHelp;
