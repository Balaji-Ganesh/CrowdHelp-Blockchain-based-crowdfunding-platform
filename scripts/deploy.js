const hre = require("hardhat");

async function main() {
  const CrowdHelp = await hre.ethers.getContractFactory("CrowdHelp");
  const crowdHelp = await CrowdHelp.deploy();

  // Create a test campaign to check the proper deployment of contract..
  const blockNumBefore = await ethers.provider.getBlockNumber();
  const blockBefore = await ethers.provider.getBlock(blockNumBefore);
  const currentTimestamp = blockBefore.timestamp;

  const deadline = currentTimestamp + 3600; // deadline 1 hour in future

  await crowdHelp.createCampaign(
    "Demo Campaign",
    "Creation of this campaign successfully indicates that, contract is successfully deployed..!!",
    100,
    1000,
    deadline,
    "bannerUrl",
    0
  ); // Assuming scheme = 0

  // const [deployer] = await hre.ethers.getSigners();

  // const Campaign = await hre.ethers.getContractFactory("Campaign");

  // const campaign = await Campaign.deploy(
  //   deployer.address,
  //   100, // minimum
  //   1713728020, // deadline timestamp
  //   1000, // target
  //   "Test Project", // title
  //   "This is a test", // desc
  //   "http://banner.url", // banner
  //   0 // schemeId (assuming enum Basic)
  // );

  await crowdHelp.deployed();

  console.log("CrowdHelp deployed to:", crowdHelp.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });

// const hre = require("hardhat");

// async function main() {
//   // Deploy the factory contract
//   const CrowdHelp = await hre.ethers.getContractFactory("CrowdHelp");
//   const crowdHelp = await CrowdHelp.deploy();
//   await crowdHelp.deployed();

//   console.log("CrowdHelp deployed to:", crowdHelp.address);

//   // Now create a campaign with VALID parameters
//   const minContribution = hre.ethers.utils.parseEther("0.01");
//   const goal = hre.ethers.utils.parseEther("1");
//   const deadline = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now

//   const tx = await crowdHelp.createCampaign(
//     "Save the Forests", // projectTitle
//     "Planting 10,000 trees to fight climate change", // projectDesc
//     minContribution,
//     goal,
//     deadline,
//     "https://images.unsplash.com/photo-1503785640985-f62e3aeee448", // bannerUrl
//     0 // campaignSchemeId - ✅ must be 0 or 1 only
//   );

//   await tx.wait();
//   console.log("Campaign created successfully!");

//   // fetch the created campaign
//   const campaigns = await crowdHelp.returnDeployedCampaigns();
//   console.log("Deployed campaigns:", campaigns);

//   console.log("Deploying campaign with:");
//   console.log({
//     projectTitle: "Some Title",
//     projectDesc: "Some Description",
//     minimumContribution: ethers.utils.parseEther("0.01").toString(),
//     targetContribution: ethers.utils.parseEther("1").toString(),
//     deadline: Math.floor(Date.now() / 1000) + 86400,
//     bannerUrl: "https://someurl.com/banner.jpg",
//     campaignSchemeId: 0, // or 1 ONLY
//   });
// }

// // Standard error handler
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error("Deployment failed:", error);
//     process.exit(1);
//   });
