# Index - _What's in this?_

- [Current status of Project](#current-status-of-the-project)
- [**Guidelines**](#guidelines)
  - [Packages Installed (purpose)](#packages-installed-purpose)
  - [How to run?](#how-to-run)
  - [How to make contributions?](#how-to-make-contributions)
  - Development
    - [of required features](#for-development-new-features)
    - [fixing raised bugs](#for-development-fixing-bugs-raised-as-issues)
  - Testing
    - [For testing](#for-testing)
    - [Handy tools](#tools)
  - Miscellaneous
    - [New feature Ideas](#feature-updations-ideas-idea-for-next-iterative-versions)
    - [Resources used](#resources-used-for-implementation)
- [**Work Division**](#work-division)
  - [Milestones](#milestones-of-the-project---total-modules)
  - [Task Division](#tasks-division)

# Current Status of the project
- Application is deployed on Netlify _(for frontend)_ and Infura _(Goerli test network)_ with essential features _(listed below)_.
- Please checkout at [here](https://crowdhelp.netlify.app). Found any bugs? or felt like need some features -- please feel free to raise a new issue or submit your pull request.

# Guidelines

## Packages Installed (purpose)

- Used [Vitejs](https://vitejs.dev/) toolkit to setup the project. **Not `create-react-app`**.
- `firebase`
- `axios` - to deal with the requests POST, GET...

1. MUIv5: `yarn add @mui/material @emotion/react @emotion/styled` - to use the MUI5 components and designs
2. MUI Icons: `yarn add @mui/icons-material` - for usage of MUI SVG icons

## How to run?

- Clone the repository.
- Make sure the `yarn` has installed. If not installed already use: `npm install --global yarn`.
- Then use `yarn` to install all the necessary packages and `yarn dev` to run the local server.

## How to make contributions?

- Follow the above step.

### For development (New Features)

- create a separate branch - may be of your name, then develop.
- Perform tests, if working fine - make a Merge request.

### For Development (Fixing bugs raised as Issues)

- solve the issue - use the issues page to discuss.
- At last, make commit with the issue no. and make merge request.

### For testing

- Run the project, and try to find the bugs or any component not working in the way it should then raise an issue (from the **Issues** tab).
- Please raise the issue, with appropriate explanation or screenshots -- so that, can reproduce the issue and solve it.

### Tools

- **Backend**
  - Postman & Thunderclient (available as VS code extension)
- **Frontend**
  - React developer tools (available as browser extension)

## Feature Updations Ideas :idea: (For next iterative versions)

1. Filling campaign **tsets**
   - Giving info labels .. to`describe why those fields are required - take ref of`kickstarter

## Resources used for implementation

1. [Inspired from MUI templates](https://v4.mui.com/getting-started/templates/)
   - Pages like `Campaign Creation`, `SignIn`, `SignUp` are inspired from the templates - infact, few are taken directly _(Attributions to the authors)_.

# ~Work Division~ -> Work Status

## Milestones of the project _- Total Modules_

1. [X] Landing page, ~Login, Sign-in, Sign-up~ _(These are made, but later removed)_
2. [X] Campaign Creation
3. [X] Funding Campaign
4. [X] Withdrawl of funds
   - ~Withdraw request raise - by fundraiser~ _(Next update feature)_
   - ~Withdraw request acceptance decision - by backer~ _(Next update feature)_
   - [x] Fund raiser can make a withdraw call after the deadline - (**constraint**: campaign has reached a SUCCESS stage ) -- then all the funds, which are funded, will be credited to fundraiser's account address _(Which is taken at the time of campaign creation)_.
5. [X] Ending campaign
   - [x] Normal ending - _(i.e., ending after deadline)_
   - [x] Ending in-between - termed as **Aborting Campaign**.
      - Fund raiser can make a abort call (before deadline) - when called, all the amount _(if funded partially / SUCCESS)_ will be payed back to backers.
6. [X] Blockchain smartcontract -- currently fulfills only essential features.

- Regarding each milestone

## Tasks Division

- @Shivrajbande - Campaigns and Smart contract
  - Lacking specificity -- _raises ambiguity .oO What should I do? what will other do..?_
    - Would you like to take..?
      - Funding campaigns
      - Funds Withdraw
      - Ending campaigns
- @BalajiGanesh - Campaigns and Smart contract
  1.  Project Setup & initial deploy
      - [x] Project Setup with vitejs and MUI - done
      - [x] Basic home-page with authentication: {`Sign-In`, `Sign-Up`, `Forgot-Password`, `Update Profile`}
      - [x] Skeleton of Campaign creation - _(pending: milestones - this needs discussion)_.
      - [x] Deploy the project - UI in Netlify - checkout at [here](https://crowdhelp.netlify.app/)
  2.  Creating campaigns _-- Need help of others_
      - [x] Taking details from fundraiser -- **without milestones**
      - ~Taking milestones details~ _-- feature shifted next iteration._.
      - [X] Deploying in blockchain
  3.  Displaying campaigns
      - [x] Displaying _few_ active campaigns in homepage
      - [x] [separate] campaigns page - which lists all the active campaigns
      - [x] Viewing particular campaign - which shows the transactions, option to fund, ~option to raise withdraw request and milestones set~.
  4.  ~Funds withdraw _-- Need help of others_~ -- _Feature shifted to next iteration_
      - Taking withdraw request -
      - Notifying the contributors, reg. withdraw request.
      - Taking the acceptance decision of them.
      - Approving withdraw request based on the count.
      - Updating the acceptance % to fundraiser.
  5.  Ending campaigns
      - [X] Normal ending -- i.e., as the deadline completes.
      - [x] Abrupt ending -- i.e., ending in-between.
- @Manan - Integration of whole application with Solidity and back-end
- @GautamGupta - Designing test cases.
  - Lacking specificity -- Only _Designing_..? Who will take testing then?

## Smart contract deployment errors & employed fixes

- $`npx hardhat compile` giving `Compiled 1 Solidity file successfully`.
- But $`npx hardhat run --network localhost scripts/deploy.js ` giving ..

```sh
  TypeError: Cannot read properties of undefined (reading 'getContractFactory')
      at main (<Project_root_path>/CrowdHelp-Blockchain-based-crowdfunding-platform/scripts/deploy.js:6:38)
      at Object.<anonymous> (<Project_root_path>/CrowdHelp-Blockchain-based-crowdfunding-platform/scripts/deploy.js:16:1)
      at Module._compile (node:internal/modules/cjs/loader:1105:14)
      at Object.Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
      at Module.load (node:internal/modules/cjs/loader:981:32)
      at Function.Module._load (node:internal/modules/cjs/loader:822:12)
      at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
      at node:internal/main/run_main_module:17:47
```

- The interesting thing here is.. the same (`deploy.js` & `CrowdHelp.sol`) when ran the above commands, it went smooth -- with project-setup of `hardhat run` --- so installed all the depedencies in this one, but same story repeated.
- So, to continue eploying the option of compiling & deploying the contract in that (hardhat configured JS project) and pasting those artifacts in this original file.

### Update..

- After installing few dependencies as suggested.. getting this one..

```sh
TypeError: Cannot read properties of undefined (reading 'prototype')
at registerCustomInspection (<Project_path>/CrowdHelp-Blockchain-based-crowdfunding-platform/node_modules/@nomiclabs/hardhat-ethers/src/internal/index.ts:22:13)
    at /run/media/krishna/WorkAndWorkResources/Work/Blockchain/IOMP-Academics/CrowdHelp-Blockchain-based-crowdfunding-platform/node_modules/@nomiclabs/hardhat-ethers/src/internal/index.ts:34:5
    at getRealTarget (<Project_path>/CrowdHelp-Blockchain-based-crowdfunding-platform/node_modules/hardhat/src/internal/util/lazy.ts:112:22)
    at Object.get (<Project_path>/CrowdHelp-Blockchain-based-crowdfunding-platform/node_modules/hardhat/src/internal/util/lazy.ts:185:26)
    at main (<Project_path>/CrowdHelp-Blockchain-based-crowdfunding-platform/scripts/deploy.js:5:38)
    at Object.<anonymous> (<Project_path>/CrowdHelp-Blockchain-based-crowdfunding-platform/scripts/deploy.js:15:1)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
```

### Employed fix
- Finally [hardhat docs solution](https://hardhat.org/tutorial/deploying-to-a-live-network#deploying-to-remote-networks) worked.
- This one employed earlier too, but used `0x` before PRIVATE_KEY -- came to here from [Palm.io docs - _referenced by Infura_](https://docs.palm.io/HowTo/Deploy-using-Hardhat/).
