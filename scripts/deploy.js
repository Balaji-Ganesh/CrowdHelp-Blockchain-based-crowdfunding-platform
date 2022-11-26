/*
const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const CrowdHelp = await hre.ethers.getContractFactory("CrowdHelp");
  const crowdHelp = await CrowdHelp.deploy();

  await crowdHelp.deployed();

  console.log("CrowdHelp deployed to:", crowdHelp.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  */

 module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId,
    getUnnamedAccounts,
  }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log("Contract deployed to address:", deployer);

    // Deploy "NFT" if the contract was never deployed or if the code has changed since the last deployment
    await deploy("CrowdHelp", {
      from: deployer,
      gasLimit: 4000000,
      args: [],
      log: true,
    });
  };
