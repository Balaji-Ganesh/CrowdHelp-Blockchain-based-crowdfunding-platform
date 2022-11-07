# Index - _What's in this?_

- **Guidelines**
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
- **Work Division**
  - [Milestones](#total-modules)
  - [Task Division](#tasks-division)

# Guidelines

## Packages Installed (purpose)

- Used [Vitejs](https://vitejs.dev/) toolkit to setup the project. **Not `create-react-app`**.

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

# Work Division

## Milestones of the project _- Total Modules_

1. Landing page, Login, Sign-in, Sign-up
   - UI & back-end connection.
2. Campaign Creation
3. Funding Campaign
4. Withdrawl of funds
   - Withdraw request raise - by fundraiser
   - Withdraw request acceptance decision - by backer
5. Ending campaign
   - Normal ending - _(i.e., ending after deadline)_
   - Ending in-between - _as next version feature_
6. ### Blockchain smartcontract << -- **Core** of all

- Regarding each milestone

## Tasks Division

- @Shivrajbande - Campaigns and Smart contract
  - Lacking specificity -- _raises ambiguity .oO What should I do? what will other do..?_
    - Would you like to take..?
      - Funding campaigns
      - Funds Withdraw
      - Ending campaigns
- @BalajiGanesh - Campaigns and Smart contract
  1.  Creating campaigns _-- Need help of others_
      - Taking details from fundraiser
      - Taking milestones details
      - Deploying in blockchain
  2.  Displaying campaigns
      - Displaying _few_ active campaigns in homepage
      - [separate] campaigns page - which lists all the active campaigns
      - Viewing particular campaign - which shows the transactions, option to fund, option to raise withdraw request and milestones set.
  3.  Funds withdraw _-- Need help of others_
      - Taking withdraw request -
      - Notifying the contributors, reg. withdraw request.
      - Taking the acceptance decision of them.
      - Approving withdraw request based on the count.
      - Updating the acceptance % to fundraiser.
  4.  Ending campaigns
      - How to sub-divide?
- @Manan - Integration of whole application with Solidity and back-end
- @GautamGupta - Designing test cases.
  - Lacking specificity -- Only _Designing_..? Who will take testing then?

How to get checkboxes in md
