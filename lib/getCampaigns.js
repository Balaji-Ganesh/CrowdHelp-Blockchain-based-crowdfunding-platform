// [block-chain] smart-contract related imports..

import factory from "../smart-contract/factory";
import web3 from "../smart-contract/web3";
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

    // will be getting as array .. cvt to object.. i.e., in an understandable format
    var formattedSummaries = [];
    campaignsSummary.forEach((summary, idx) => {
      var campaign = {
        title: summary[5],
        description: summary[6],
        createdBy: summary[4],
        bannerUrl: summary[7],
        ethRaised: web3.utils.fromWei(summary[8], "ether"),
        ethFunded: web3.utils.fromWei(summary[1], "ether"),
        id: campaigns[idx],
        campaignStatus: "IN DEVELOPMENT",
        deadline: "24-11-2022T13:13:58",
      };
      formattedSummaries.push(campaign);
      console.log(campaign);
    });

    // return the work did..
    return formattedSummaries;
  } catch (err) {
    console.error("[ERROR] occured in getting campaigns summary");
    console.error(err);
  }
};

export const getCampaignDetails = async (campaignId) => {
  try {
    // get details of all the campaigns
    const summary = await Campaign(campaignId).methods.getSummary().call();

    // log it to check..
    console.log(summary);

    // will be getting as array .. cvt to object.. i.e., in an understandable format
    const formattedSummary = {
      id: campaignId,
      minContribAmount: web3.utils.fromWei(summary[0], "ether"),
      ethFunded: web3.utils.fromWei(summary[1], "ether"),
      requestsCount: summary[2],
      backersCount: summary[3],
      createdBy: summary[4],
      title: summary[5],
      description: summary[6],
      bannerUrl: summary[7],
      ethRaised: web3.utils.fromWei(summary[8], "ether"),
      campaignStatus: "IN DEVELOPMENT",
      deadline: "24-11-2022T13:13:58",
    };

    // return the work did..
    return formattedSummary;
  } catch (err) {
    console.error("[ERROR] occured in getting a campaign summary");
    console.error(err);
  }
};
