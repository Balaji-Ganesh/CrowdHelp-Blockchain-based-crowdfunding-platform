const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("CrowdHelp Contract", () => {
  let crowdHelp;
  let owner, addr1, addr2;
  const schemeId = 0;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const CrowdHelp = await ethers.getContractFactory("CrowdHelp");
    crowdHelp = await CrowdHelp.deploy();
    await crowdHelp.deployed();
  });

  it("should deploy and allow creating a campaign", async () => {
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const currentTimestamp = blockBefore.timestamp;

    const deadline = currentTimestamp + 3600; // deadline 1 hour in future
    console.log("Deadline being set:", deadline);

    await crowdHelp.createCampaign(
      "Clean Water Project",
      "Providing clean water to remote areas",
      ethers.utils.parseEther("0.01"),
      ethers.utils.parseEther("1"),
      deadline,
      "https://example.com/banner.jpg",
      schemeId
    );

    const deployed = await crowdHelp.getDeployedCampaigns();
    expect(deployed.length).to.equal(1);
  });

  it("should fail if deadline is in the past", async () => {
    const pastDeadline = Math.floor(Date.now() / 1000) - 1000;

    await expect(
      crowdHelp.createCampaign(
        "Expired",
        "Should fail",
        ethers.utils.parseEther("0.01"),
        ethers.utils.parseEther("1"),
        pastDeadline,
        "https://example.com/banner.jpg",
        schemeId
      )
    ).to.be.revertedWith("Deadline must be in the future");
  });

  it("should track multiple campaigns", async () => {
    const titles = ["A", "B"];
    for (const title of titles) {
      const blockNumBefore = await ethers.provider.getBlockNumber();
      const blockBefore = await ethers.provider.getBlock(blockNumBefore);
      const currentTimestamp = blockBefore.timestamp;

      const deadline = currentTimestamp + 3600; // deadline 1 hour in future
      console.log("Deadline being set:", deadline);

      await crowdHelp.createCampaign(
        title,
        "desc",
        ethers.utils.parseEther("0.01"),
        ethers.utils.parseEther("1"),
        deadline,
        "url",
        schemeId
      );
    }

    const deployed = await crowdHelp.getDeployedCampaigns();
    expect(deployed.length).to.equal(2);
  });

  it("should allow contributing to a campaign and update state", async () => {
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const currentTimestamp = blockBefore.timestamp;

    const deadline = currentTimestamp + 3600; // deadline 1 hour in future

    await crowdHelp.createCampaign(
      "Health Fund",
      "Medical aid",
      ethers.utils.parseEther("0.01"),
      ethers.utils.parseEther("1"),
      deadline,
      "url",
      schemeId
    );

    const [campaignAddr] = await crowdHelp.getDeployedCampaigns();
    const Campaign = await ethers.getContractFactory("Campaign");
    const campaign = await Campaign.attach(campaignAddr);

    await campaign.connect(addr1).contribute({
      value: ethers.utils.parseEther("0.05"),
    });

    const balance = await ethers.provider.getBalance(campaign.address);
    expect(balance).to.equal(ethers.utils.parseEther("0.05"));
  });

  it("should reject contribution below minimum", async () => {
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const currentTimestamp = blockBefore.timestamp;

    const deadline = currentTimestamp + 3600; // deadline 1 hour in future
    await crowdHelp.createCampaign(
      "Low Reject",
      "Testing",
      ethers.utils.parseEther("0.1"),
      ethers.utils.parseEther("1"),
      deadline,
      "url",
      schemeId
    );

    const [campaignAddr] = await crowdHelp.getDeployedCampaigns();
    const Campaign = await ethers.getContractFactory("Campaign");
    const campaign = await Campaign.attach(campaignAddr);

    await expect(
      campaign.connect(addr2).contribute({
        value: ethers.utils.parseEther("0.01"),
      })
    ).to.be.revertedWith("Contribution amount is too low !");
  });

  it("should store correct details for each campaign", async () => {
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const currentTimestamp = blockBefore.timestamp;

    const deadline = currentTimestamp + 3600; // deadline 1 hour in futurene();
    await crowdHelp.createCampaign(
      "Education",
      "Helping students",
      ethers.utils.parseEther("0.05"),
      ethers.utils.parseEther("2"),
      deadline,
      "url",
      schemeId
    );

    const [campaignAddr] = await crowdHelp.getDeployedCampaigns();
    const Campaign = await ethers.getContractFactory("Campaign");
    const campaign = await Campaign.attach(campaignAddr);

    expect(await campaign.projectTitle()).to.equal("Education");
    expect(await campaign.projectDes()).to.equal("Helping students");
  });

  it("should refund all contributors when campaign is aborted", async function () {
    // Setup campaign
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const currentTimestamp = blockBefore.timestamp;
    const deadline = currentTimestamp + 3600;

    await crowdHelp.createCampaign(
      "Abortable Campaign",
      "Testing refund on abort",
      ethers.utils.parseEther("0.1"),
      ethers.utils.parseEther("1"),
      deadline,
      "url",
      schemeId
    );

    const [campaignAddr] = await crowdHelp.getDeployedCampaigns();
    const Campaign = await ethers.getContractFactory("Campaign");
    const campaign = await Campaign.attach(campaignAddr);

    const contribution1 = ethers.utils.parseEther("0.3");
    const contribution2 = ethers.utils.parseEther("0.4");

    await campaign.connect(addr1).contribute({ value: contribution1 });
    await campaign.connect(addr2).contribute({ value: contribution2 });

    const balance1Before = await ethers.provider.getBalance(addr1.address);
    const balance2Before = await ethers.provider.getBalance(addr2.address);

    const tx = await campaign.connect(owner).abortCampaignAndRefund();
    await tx.wait();

    const summary = await campaign.getCampaignSummary();
    expect(summary.currentState).to.equal(3); // ABORTED

    const balance1After = await ethers.provider.getBalance(addr1.address);
    const balance2After = await ethers.provider.getBalance(addr2.address);

    expect(balance1After).to.be.above(
      balance1Before.sub(contribution1.div(100))
    );
    expect(balance2After).to.be.above(
      balance2Before.sub(contribution2.div(100))
    );
  });

  it("should allow creator to end campaign and receive funds when target is met", async function () {
    // Setup campaign
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const currentTimestamp = blockBefore.timestamp;
    const deadline = currentTimestamp + 3600;

    await crowdHelp.createCampaign(
      "Success Campaign",
      "Testing payout on success",
      ethers.utils.parseEther("0.1"),
      ethers.utils.parseEther("1"),
      deadline,
      "url",
      schemeId
    );

    const [campaignAddr] = await crowdHelp.getDeployedCampaigns();
    const Campaign = await ethers.getContractFactory("Campaign");
    const campaign = await Campaign.attach(campaignAddr);

    const contribution1 = ethers.utils.parseEther("0.6");
    const contribution2 = ethers.utils.parseEther("0.5");

    await campaign.connect(addr1).contribute({ value: contribution1 });
    await campaign.connect(addr2).contribute({ value: contribution2 });

    const summaryBefore = await campaign.getCampaignSummary();
    expect(summaryBefore.currentState).to.equal(1); // SUCCESS

    const creatorBalanceBefore = await ethers.provider.getBalance(
      owner.address
    );

    const tx = await campaign.connect(owner).endCampaignAndCredit();
    const receipt = await tx.wait();

    const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

    const creatorBalanceAfter = await ethers.provider.getBalance(owner.address);
    const expectedPayout = contribution1.add(contribution2);

    expect(creatorBalanceAfter).to.be.closeTo(
      creatorBalanceBefore.add(expectedPayout).sub(gasUsed),
      ethers.utils.parseEther("0.01")
    );

    const summaryAfter = await campaign.getCampaignSummary();
    expect(summaryAfter.currentState).to.equal(2); // EXPIRED
  });
});
