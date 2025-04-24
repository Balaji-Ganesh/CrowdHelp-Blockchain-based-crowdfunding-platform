// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


uint constant SCHEMES_COUNT = 2; // Make sure to modify accordingly as per items in following enum.
enum SchemeType {
    ALL_OR_NOTHING, // 0
    HALF_GOAL_WITHDRAW // 1
    // MILESTONES_BASED     // upcoming..
}

