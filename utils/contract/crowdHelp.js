import web3 from "../web3";
import CrowdHelp from "../../artifacts/contracts/CrowdHelp.sol/CrowdHelp.json"

const crowdHelpContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const crowdHelp = new web3.eth.Contract(CrowdHelp.abi, crowdHelpContractAddress)


export default crowdHelp;
