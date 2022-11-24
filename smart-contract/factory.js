import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x28Fb6F3f0e61BB2694031B0816CffBFde57c461a"
);

export default instance;
