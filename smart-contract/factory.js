import web3 from "./web3";
import CrowdHelp from "./build/CrowdHelp.json";

const instance = new web3.eth.Contract(
  JSON.parse(CrowdHelp.interface),
  "0x28Fb6F3f0e61BB2694031B0816CffBFde57c461a"
);

export default instance;
