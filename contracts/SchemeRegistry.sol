// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library SchemeRegistry {
    uint public constant SCHEMES_COUNT = 2; // Make sure to modify accordingly as per items in following enum.
    enum SchemeType {
        ALL_OR_NOTHING, // 0
        HALF_GOAL_WITHDRAW // 1
        // MILESTONES_BASED     // upcoming..
    }

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
