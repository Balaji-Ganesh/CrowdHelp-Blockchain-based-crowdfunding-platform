// [block-chain] smart-contract related imports..

import factory from "../smart-contract/factory";
// import web3 from "../../smart-contract/web3";
import Campaign from "../smart-contract/campaign";

// fetch the deployed campaigns addresses.
export const getDeployedCampaigns = async () => {
  // get the addresses of the deployed campaigns..
  const campaignsList = await factory.methods.getDeployedCampaigns().call();

  // console.log("deployed: " + deployedCampaignsList);
  return campaignsList;
};

export const getCampaignsSummary = async (campaigns) => {
  try {
    // get details of all the campaigns
    const campaignsSummary = await Promise.all(
      campaigns.map((campaign, idx) =>
        Campaign(campaigns[idx]).methods.getSummary().call()
      )
    );
    // log it to check..
    console.log(campaignsSummary);

    // return the work did..
    return campaignsSummary;
  } catch (err) {
    console.error("[ERROR] occured in getting campaigns summary");
    console.error(err);
  }
};
