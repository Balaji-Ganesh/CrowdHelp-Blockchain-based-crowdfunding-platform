//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SchemeRegistry.sol";
import "./Campaign.sol";
import "hardhat/console.sol";

contract CrowdHelp {
    // events
    event CampaignStarted(
        address projectContractAddress,
        address creator,
        uint256 minContribution,
        uint256 projectDeadline,
        uint256 goalAmount,
        uint256 currentAmount,
        uint256 noOfContributors,
        string title,
        string desc,
        uint currentState
    );

    event ContributionReceived(
        address projectAddress,
        uint256 contributedAmount,
        address indexed contributor
    );

    event CampaignCreationFailed(string reason);

    Campaign[] private deployedCampaigns;

    // @dev Anyone can start a fund rising
    // @return null
    
    function createCampaign(
        string memory projectTitle,
        string memory projectDesc,
        uint256 minimumContribution,
        uint256 targetContribution,
        uint256 deadline,
        string memory bannerUrl,
        uint campaignSchemeId
    ) public {
        console.log("Creating campaign with scheme:", uint(campaignSchemeId));
        Campaign campaign = new Campaign(
            msg.sender,
            minimumContribution,
            deadline,
            targetContribution,
            projectTitle,
            projectDesc,
            bannerUrl,
            campaignSchemeId    // passing directly like this..
        );
        
        console.log("Creating campaign with scheme:", uint(campaignSchemeId));
        deployedCampaigns.push(campaign);
    }

    // @dev Get deployedCampaigns list
    // @return array

    function returnDeployedCampaigns()
        external
        view
        returns (Campaign[] memory)
    {
        return deployedCampaigns;
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
    address[] memory campaignAddresses = new address[](deployedCampaigns.length);
    for (uint i = 0; i < deployedCampaigns.length; i++) {
        campaignAddresses[i] = address(deployedCampaigns[i]);
    }
    return campaignAddresses;
}
}
