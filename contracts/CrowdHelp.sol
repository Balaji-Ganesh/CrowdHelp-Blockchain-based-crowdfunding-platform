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
        uint campaignSchemeTypeId
    ) public {
        require( campaignSchemeTypeId >= 0 || campaignSchemeTypeId < SCHEMES_COUNT, "Invalid scheme id");
        console.log("Creating campaign with scheme:", uint(campaignSchemeTypeId));
        
        Campaign campaign = new Campaign(
            msg.sender,
            minimumContribution,
            deadline,
            targetContribution,
            projectTitle,
            projectDesc,
            bannerUrl,
            getSchemeType(campaignSchemeTypeId)
        );

        console.log("Creating campaign with scheme:", uint(campaignSchemeTypeId));
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

    ///////////////////// Handlers of scheme types...
    function getSchemeTitle(
        uint idx
    ) public pure returns (string memory title) {
        require(idx < SCHEMES_COUNT, "Index out of range");
        if (idx == uint(SchemeType.ALL_OR_NOTHING)) return "All or Nothing";
        if (idx == uint(SchemeType.HALF_GOAL_WITHDRAW))
            return "Half goal withdraw";
        return "Invalid scheme";
    }

    function getAllSchemeTitles() public pure returns (string[] memory) {
        string[] memory allSchemeTitles = new string[](SCHEMES_COUNT);
        for (uint i = 0; i < SCHEMES_COUNT; i++) {
            allSchemeTitles[i] = getSchemeTitle(i);
        }
        return allSchemeTitles;
    }

    function getSchemeType(uint id) public pure returns (SchemeType) {
        require(id < SCHEMES_COUNT, "Index out of range");
        if (id == uint(SchemeType.ALL_OR_NOTHING))
            return SchemeType.ALL_OR_NOTHING;
        return SchemeType.HALF_GOAL_WITHDRAW;
    }
}
