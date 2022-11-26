// [block-chain] smart-contract related imports..

import crowdHelp from "./contract/crowdHelp";
import web3 from "./web3";
import Campaign from "./contract/campaign";

// fetch the deployed campaigns addresses.
export const getDeployedCampaigns = async () => {
  // get the addresses of the deployed campaigns..
  console.log("get deployed campaigns called");
  const campaignsList = await crowdHelp.methods
    .returnDeployedCampaigns()
    .call();

  console.log("deployed: " + campaignsList);
  return campaignsList;
};

export const getCampaignsSummary = async (campaigns) => {
  console.log("Called with..");
  console.log(campaigns)
  try {
    // get details of all the campaigns
    const campaignsSummary = await Promise.all(
      campaigns.map((campaign, idx) =>
        Campaign(campaigns[idx]).methods.getCampaignSummary().call()
      )
    );
    // log it to check..
    console.log(campaignsSummary);

    // will be getting as array .. cvt to object.. i.e., in an understandable format
    var formattedSummaries = [];
    campaignsSummary.forEach((summary, idx) => {
      var campaign = {
        title: summary['title'],
        description: summary['desc'],
        ethRaised: web3.utils.fromWei(summary['goalAmount'], "ether"),
        ethFunded: web3.utils.fromWei(summary['currentAmount'], "ether"),
        createdBy: summary['projectStarter'],
        bannerUrl: summary['imageUrl'],
        id: campaigns[idx],
        deadline: summary['projectDeadline'],
        campaignStatus: summary['currentState'],
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

      title: summary["title"],
      description: summary["desc"],
      ethRaised: web3.utils.fromWei(summary["goalAmount"], "ether"),
      ethFunded: web3.utils.fromWei(summary["currentAmount"], "ether"),
      createdBy: summary["projectStarter"],
      bannerUrl: summary["imageUrl"],
      id: campaigns[idx],
      deadline: summary["projectDeadline"],
      campaignStatus: summary["currentState"],

      minContribAmount: web3.utils.fromWei(summary['minContribution'], "ether"),
      
      requestsCount: summary[2],
      backersCount: summary[3],
      
      
      
      
      
    };

    // return the work did..
    return formattedSummary;
  } catch (err) {
    console.error("[ERROR] occured in getting a campaign summary");
    console.error(err);
  }
};
