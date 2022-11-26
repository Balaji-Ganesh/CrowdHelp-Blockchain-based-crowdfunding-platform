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
  console.log(campaigns);
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
      formattedSummaries.push(formatSummary(summary, campaigns[idx]));
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
    const summary = await Campaign(campaignId)
      .methods.getCampaignSummary()
      .call();

    // log it to check..
    console.log(summary);

    return formatSummary(summary, campaignId);
    // will be getting as array .. cvt to object.. i.e., in an understandable format
  } catch (err) {
    console.error("[ERROR] occured in getting a campaign summary");
    console.error(err);
  }
};

// helpers..
function formatSummary(summary, campaignId) {
  const formattedSummary = {
    id: campaignId,
    title: summary["title"],
    description: summary["desc"],
    ethRaised: web3.utils.fromWei(summary["goalAmount"], "ether"),
    ethFunded: web3.utils.fromWei(summary["currentAmount"], "ether"),
    minContribAmount: web3.utils.fromWei(summary["minContribution"], "ether"),
    createdBy: summary["projectStarter"],
    bannerUrl: summary["imageUrl"],
    deadline: parseInt(summary["projectDeadline"]),
    campaignStatus: cvtIntStatusToEnum(summary["currentState"]),
    // requestsCount: summary[2],
    backersCount: summary["numBackers"],
  };

  // return the work did..
  return formattedSummary;
}

function cvtIntStatusToEnum(status) {
  var str = "";
  switch (status) {
    case "0":
      str = "ACTIVE";
      break;
    case "1":
      str = "SUCCESS";
      break;
    case "2":
      str = "EXPIRED";
      break;
    case "3":
      str = "ABORTED";
      break;
    default:
      str = "UNKNOWN";
  }
  return str;
}
