// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

uint constant SCHEMES_COUNT = 2; // Make sure to modify accordingly as per items in following enum.
enum CampaignSchemeId {
    ALL_OR_NOTHING, // 0
    HALF_GOAL_WITHDRAW // 1
    // MILESTONES_BASED     // upcoming..
}

function getSchemeTitle(uint idx) pure returns (string memory title) {
    require(idx < SCHEMES_COUNT, "Index out of range");
    if (idx == uint(CampaignSchemeId.ALL_OR_NOTHING)) return "All or Nothing";
    if (idx == uint(CampaignSchemeId.HALF_GOAL_WITHDRAW)) return "Half goal withdraw";
    return "Invalid scheme";
}

function getAllSchemeTitles() pure returns (string[] memory) {
    string[] memory allSchemeTitles = new string[](SCHEMES_COUNT);
    for (uint i = 0; i < SCHEMES_COUNT; i++) {
        allSchemeTitles[i] = getSchemeTitle(i);
    }
    return allSchemeTitles;
}

function getSchemeId(uint id) pure returns (CampaignSchemeId) {
    require(id < SCHEMES_COUNT , "Index out of range");
    if (id == uint(CampaignSchemeId.ALL_OR_NOTHING)) return CampaignSchemeId.ALL_OR_NOTHING;
    return CampaignSchemeId.HALF_GOAL_WITHDRAW;
}
