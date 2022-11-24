// [block-chain] smart-contract related imports..

import factory from "../smart-contract/factory";
// import web3 from "../../smart-contract/web3";
import Campaign from "../smart-contract/campaign";

// fetch the deployed campaigns addresses.
export const getDeployedCampaigns = async () => {
  // get the addresses of the deployed campaigns..
  const deployedCampaignsList = await factory.methods
    .getDeployedCampaigns()
    .call();

  console.log("deployed: " + deployedCampaignsList);
  return deployedCampaignsList;
};