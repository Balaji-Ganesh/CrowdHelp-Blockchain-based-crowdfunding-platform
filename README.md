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

# How to run _(locally & remotely)_?

## Pre-requisites

- Metamask wallet with some `GoerliETH`, fine even if had < 0.5 ETH _(for testing purposes)_.
  - Lacking GoerliETH ? -- get it free of 0.2 ETH/day at [Alchemy's Goerli faucet](https://goerlifaucet.com/) -- note that, this needs sign-up.
- Clone this repo.

_(ONLY for running remotely)_

- Create an account on [Infura](https://infura.io), can also be on [Alchemy](https://www.alchemy.com/). \_(This project used Infura with `goerli-testnet`)
- Create a new project & get an end-point of it.
- Create a new file with name `.env.local` in project's root directory.
- Store the API key as ..

  ````.env
  INFURA_API_KEY=<Your API_key here>
  PRIVATE_KEY=<Your private key>

      ```

  **How to get Private key?** _(In metamask wallet)_
  ````

1. Open your metamask wallet and choose the account of which you need the private key.
2. Goto **Account Options** _(3 dots at top-right)_ → **Account Details**.
3. Now click on **Export private Key** and enter your metamask password.
4. Get this and paste in `.env.local` file as `PRIVATE_KEY`.

## Running locally _(with **hardhat**)_

_(Run these commands by being in project root directory)_

- Install the project dependencies
  ```sh
  yarn dev
  ```
- Run local hardhat network
  ```sh
  npx hardhat node
  ```
  _Make changes to the smart-contract if needed._
- Compile the smart contract via
  ```sh
  npx hardhat compile
  ```
- Deploy the smart contract
  ```sh
  npx hardhat run scripts/deploy.js --network localhost
  ```
- This outputs the message as..
  ```
  Contract deployed to address: <Hex_address>
  ```
- Paste this address at `utils/contract/crowdHelp.js` as value for `crowdHelpContractAddress` variable.

- Run the frontend
  ```sh
   yarn dev
  ```
  - This will run server on `127.0.0.1:5173`

## Running remotely

- Follow the above steps. Now just change the network as `goerli_testnet` while deploying.
  ```
   npx hardhat run scripts/deploy.js --network goerli_testnet
  ```
- To run on different test-net..
  - Use different URL in `hardhat.config.js`.

## Tech stack used

## Feature Updations Ideas :idea: (For next iterative versions)

1. Filling campaign **tsets**
   - Giving info labels .. to`describe why those fields are required - take ref of`kickstarter

## Resources used for implementation

1. [Inspired from MUI templates](https://v4.mui.com/getting-started/templates/)
   - Pages like `Campaign Creation`, `SignIn`, `SignUp` are inspired from the templates - infact, few are taken directly _(Attributions to the authors)_.

# ~Work Division~ -> Work Status

## Milestones of the project _- Total Modules_

1. [x] Landing page, ~Login, Sign-in, Sign-up~ _(These are made, but later removed)_
2. [x] Campaign Creation
3. [x] Funding Campaign
4. [x] Withdrawl of funds
   - ~Withdraw request raise - by fundraiser~ _(Next update feature)_
   - ~Withdraw request acceptance decision - by backer~ _(Next update feature)_
   - [x] Fund raiser can make a withdraw call after the deadline - (**constraint**: campaign has reached a SUCCESS stage ) -- then all the funds, which are funded, will be credited to fundraiser's account address _(Which is taken at the time of campaign creation)_.
5. [x] Ending campaign
   - [x] Normal ending - _(i.e., ending after deadline)_
   - [x] Ending in-between - termed as **Aborting Campaign**.
     - Fund raiser can make a abort call (before deadline) - when called, all the amount _(if funded partially / SUCCESS)_ will be payed back to backers.
6. [x] Blockchain smartcontract -- currently fulfills only essential features.

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
      - [x] Deploying in blockchain
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
      - [x] Normal ending -- i.e., as the deadline completes.
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
- This one employed earlier too, but used `0x` before PRIVATE*KEY -- came to here from [Palm.io docs - \_referenced by Infura*](https://docs.palm.io/HowTo/Deploy-using-Hardhat/).
