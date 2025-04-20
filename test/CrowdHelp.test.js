const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrowdHelp", function () {
  let crowdHelp;

  beforeEach(async () => {
    const CrowdHelp = await ethers.getContractFactory("CrowdHelp");
    crowdHelp = await CrowdHelp.deploy();
    await crowdHelp.deployed();
  });

  it("should deploy and allow creating a campaign", async () => {
    await crowdHelp.createCampaign(
      "Project Title",
      "Project Description",
      ethers.utils.parseEther("0.01"),
      ethers.utils.parseEther("1.0"),
      Math.floor(Date.now() / 1000) + 86400, // deadline
      "https://example.com/banner.png",
      0 // enum ID
    );

    const campaigns = await crowdHelp.getDeployedCampaigns();
    expect(campaigns.length).to.equal(1);
  });
});
