// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SchemeRegistry.sol";
import "hardhat/console.sol"; // for local testing only. Have to be deleted if to be deploying in remote testnets.

contract Campaign {
    // Campaign state
    enum State {
        ACTIVE, // Campaign can receive funds / contributions
        SUCCESS, // Campaign has reached its goal before the deadling
        EXPIRED, // Campaign has withdrawn amount of successfully ended campaign
        ABORTED // Campaign has terminted in-between, all the raised amount has refunded back to backers.
    }

    struct Contribution {
        address payable contributor;
        uint256 amount;
        bool halfWithdrawConsent;
    }

    // Variables
    address payable public creator;
    uint256 public minimumContribution;
    uint256 public deadline;
    uint256 public targetContribution; // required to reach at least this much amount
    uint public reachedTargetAt; // what's the usage of this..?? -- stores when it has ended (by the fundraiser)
    uint256 public raisedAmount; // Total raised amount till now
    uint256 public noOfContributors;
    string public projectTitle;
    string public projectDes;
    string public bannerUrl;
    State public state = State.ACTIVE;
    SchemeType public schemeTypeId;

    // mapping (uint => Contribution) public contributors;      // use indices as address with amountContributed as its values.
    Contribution[] contributions;
    // after work... replace this with contributions.. -- as of type array
    // Modifiers
    modifier isCreator() {
        require(
            msg.sender == creator,
            "You dont have access to perform this operation !"
        );
        _;
    }

    modifier canContribute() {
        require(
            state == State.ACTIVE || state == State.SUCCESS,
            "Invalid state"
        );
        require(
            block.timestamp < deadline,
            "Sorry backer, deadline has passed! No contributions can be accepted now."
        );
        _;
    }

    // Events
    // Event that will be emitted whenever funding will be received
    event FundingReceived(address contributor, uint amount, uint currentTotal);
    // Event gets emitted when amount gets credited to fund raiser - when campaign has ended
    event AmountCredited(address contributor, uint amountTotal);
    // Event gets emitted when campaign gets aborted [before deadline]
    event AmountRefunded(uint noOfContributors, uint amountTotal);

    event CampaignCreated(uint deadline, uint blockTime);

    constructor(
        address _creator,
        uint256 _minimumContribution,
        uint256 _deadline,
        uint256 _targetContribution,
        string memory _projectTitle,
        string memory _projectDes,
        string memory _bannerUrl,
        SchemeType _schemeTypeId
    ) {
        // console.log("Constructor reached");
        // Pre-requisites to move further..
        emit CampaignCreated(_deadline, block.timestamp);

        console.log("Block timestamp:", block.timestamp); // needs `import "hardhat/console.sol";`
        console.log("Given deadline:", _deadline);
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(
            _minimumContribution > 0,
            "Minimum contribution must be greater than 0"
        );
        require(_targetContribution > 0, "Target must be greater than 0");

        // emit FundingReceived(payable(msg.sender), 0, 0); // debug
        creator = payable(_creator);
        minimumContribution = _minimumContribution;
        deadline = _deadline;
        targetContribution = _targetContribution;
        projectTitle = _projectTitle;
        projectDes = _projectDes;
        raisedAmount = 0;
        bannerUrl = _bannerUrl;
        schemeTypeId = _schemeTypeId;
    }

    function getContributorContribution(
        address _contributor
    ) internal view returns (int) {
        // Takes the contributor's address and returns their contribution amount (if found) else 0.
        int contribIndex = -1;
        for (int idx = 0; idx < int(noOfContributors); idx++) {
            if (_contributor == contributions[uint(idx)].contributor) {
                contribIndex = idx;
                break;
            }
        }
        return contribIndex; // when not found -- send "-1" to indicate as not found. NOTE: Only this is THE negative value used.
    }

    // @dev Anyone can contribute
    function contribute(
        bool _halfWithdrawConsent
    ) public payable canContribute {
        // validation
        require(
            msg.value >= minimumContribution,
            "Contribution amount is too low !"
        );
        address payable contributor = payable(msg.sender);
        int contributionIdx = getContributorContribution(contributor);
        if (contributionIdx == -1) {
            // if contributing for the first time..
            noOfContributors++;
            contributions.push(
                Contribution(contributor, msg.value, _halfWithdrawConsent)
            ); // store the amount of funds funded with consent (if scheme is HALF_WITHDRAW)
        }
        // if contributed already..
        else {
            contributions[uint(contributionIdx)].amount += msg.value; // update the contribution
            contributions[uint(contributionIdx)]
                .halfWithdrawConsent = _halfWithdrawConsent; // update the consent
        }
        // contributors[contributor] += msg.value;    // store the amount of funds funded -- older version
        // update the global value
        raisedAmount += msg.value;
        emit FundingReceived(contributor, msg.value, raisedAmount);
        isFundingReachedTarget();
    }

    function isFundingReachedTarget() internal {
        if (raisedAmount >= targetContribution && block.timestamp < deadline) {
            state = State.SUCCESS;
            reachedTargetAt = block.timestamp;
        }
    }

    function endCampaignAndCredit() public payable isCreator {
        // perform validation..
        require(
            state == State.SUCCESS,
            "Goal not reached, amount cannot be withdrawn. Please abort to refund to backers"
        );
        require(
            block.timestamp < deadline,
            "Campaign cannot be ended, deadline not reached."
        );
        // transfer the WHOLE amount raised to fund raiser
        creator.transfer(raisedAmount);

        // Update the campaign state
        state = State.EXPIRED;
        // emit the event..
        emit AmountCredited(creator, raisedAmount);
    }

    function abortCampaignAndRefund() public payable isCreator {
        // perform validation..
        require(
            block.timestamp < deadline,
            "Campaign cannot be aborted, deadline passed."
        );
        require(
            state == State.ACTIVE || state == State.SUCCESS,
            "Invalid state. Cannot abort campaign."
        );
        // refund money to backers
        for (uint idx = 0; idx < noOfContributors; idx++) {
            // iterate through all addresses of contrdibutors
            contributions[idx].contributor.transfer(contributions[idx].amount);
            delete contributions[idx];
        }
        // update the state..
        state = State.ABORTED;
        // emit the event..
        emit AmountRefunded(noOfContributors, raisedAmount);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getCampaignSummary()
        public
        view
        returns (
            address payable projectStarter,
            uint256 minContribution,
            uint256 projectDeadline,
            uint256 goalAmount,
            uint completedTime,
            uint256 currentAmount,
            string memory title,
            string memory desc,
            State currentState,
            uint256 balance,
            string memory imageUrl,
            uint256 numBackers,
            uint schemeId,
            bool isHalfWithdrawEligible
        )
    {
        projectStarter = creator;
        minContribution = minimumContribution;
        projectDeadline = deadline;
        goalAmount = targetContribution;
        completedTime = reachedTargetAt;
        currentAmount = raisedAmount;
        title = projectTitle;
        desc = projectDes;
        currentState = state;
        balance = address(this).balance;
        imageUrl = bannerUrl;
        numBackers = noOfContributors;
        schemeId = uint(schemeTypeId);
        isHalfWithdrawEligible = getIsHalfWithdrawEligible();
    }

    function getIsHalfWithdrawEligible()
        public
        view
        returns (bool halfWithdrawEligible)
    {
        // Validate the scheme in which this campaign is running...
        if (schemeTypeId != SchemeType.HALF_GOAL_WITHDRAW) {
            return false; // If got called by any other scheme.. send false.
        }
        // parse over all the contributors list and count #consents
        uint backersConsentCount = 0;
        for (uint idx = 0; idx < noOfContributors; idx++) {
            if (contributions[idx].halfWithdrawConsent == true)
                backersConsentCount++;
        }

        // Perform decision..
        //  If >=90% consent and funds are (greater than or equal to) half of goal.. eligible, else not.
        // NOTE: Here multiplying by 100, as if solidity division of integers results in integer (not fraction),
        //       so can't use 0.9 (to valiate for 90%) and (0.5) for half. (which are float, and stored as 0, )
        //       By multiplying by 100, the result stays in integer, not float.
        if (
            (backersConsentCount * 100) / noOfContributors >= 90 && // 90% consent check
            (raisedAmount * 100) / targetContribution >= 50 // 50% of the target check
        ) return true;
        else return false;
    }
}
