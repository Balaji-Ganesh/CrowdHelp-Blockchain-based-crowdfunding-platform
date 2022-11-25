// UI imports..
import React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Box, Button, fabClasses, styled } from "@mui/material";
import { Container, Link, TextField, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Chip from "@mui/material/Chip";
import { LoadingButton } from "@mui/lab";

// local imports..
import NavBar from "../../components/NavBar";
// service imports..
import axios from "axios";
import { useEffect } from "react";
// Wallet connection..
import { useWallet } from "use-wallet";
// form handling
import { useForm } from "react-hook-form";
// [block-chain] smart-contract related imports..
import { getCampaignDetails } from "../../../lib/getCampaigns";

// smart-contract interaction -- for contribution of funds, withdrawing money & ending campaign.
import Campaign from "../../../smart-contract/campaign";
import web3 from "../../../smart-contract/web3";

// stylings..
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const api_url = "http://localhost:4000/api/";

function ViewCampaign() {
  const campaignId = window.location.pathname.substring(10); // will get as '/campaign/xx`, trimmed to get ONLY the id.

  // hooks..
  const [responseMsg, setResponseMsg] = React.useState(""); // to display error messages.
  const [showResponse, setShowResponse] = React.useState(false); // To know whether error occured. ⁉ why not use length of error message
  const [responseSeverity, setResponseSeverity] = React.useState("error");

  const [abortCampaignMsg, setAbortCampaignMsg] = React.useState("");

  const [fundingAmount, setFundingAmount] = React.useState(0); // set this via ref's and onchange.
  const enteredAmountRef = React.useRef(0);

  const [campaignData, setCampaignData] = React.useState({});
  const wallet = useWallet();

  // for dealing with form values -- at contribution..
  const { handleSubmit, register, formState, reset, getValues } = useForm({
    mode: "onChange",
  });
  const [isContributionSuccess, setIsContributionSuccess] =
    React.useState(false);
  const [contributionError, setContributionError] = React.useState("");

  // for testing purpose..
  const etherScanAddress = "0x4d496ccc28058b1d74b7a19541663e21154f9c84"; // some dummy address.
  // these are for the -- campaignData[] -- where usage of '.' operator isn't working.
  const minAmountKey = "minContribAmount";
  const raisedMoneyKey = "ethRaised";

  // hooks..
  const [showEndCampaignConfirmation, setShowEndCampaignConfirmation] =
    React.useState(false);
  const [acceptanceStatus, setAcceptanceStatus] = React.useState(false);

  useEffect(() => {
    console.log("useEffect called");
    let ignore = false;
    // fetch the campaigns..
    const fetchData = async () => {
      await getCampaignDetails(campaignId).then((data) => {
        console.info(data);
        if (!ignore && data != undefined) setCampaignData(data);
      });
    };

    fetchData(); // call the function to fetch the data

    return () => {
      ignore = true; // to avoid rendering multiple times..
    };
  }, []);

  // helpers ..
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  async function abortCampaign() {
    // console.log("abort campaign called");
    if (acceptanceStatus === false && abortCampaignMsg.length == 0) return;

    // proceed further, only when valid.
    await axios({
      method: "DELETE",
      url: api_url + "abort-campaign/" + campaignId,
      data: {
        reason: abortCampaignMsg || "Not Mentioned",
      },
    })
      .then((response) => {
        // console.log(response);
        if (response.status == 200) {
          // console.log(response.data.msg); // SHow this in snackbar.
          setResponseSeverity("success");
          setTimeout(window.location.reload(true), 3000); // Re-load the page
          setResponseMsg(
            response.data.msg + "\n Wallet balance will get effected soon."
          );
        } else setResponseSeverity("error");

        setShowEndCampaignConfirmation(false); // close the modal
        setShowResponse(true);
      })
      .catch((err) => {
        setResponseSeverity("error");
        setShowResponse(true);
        setResponseMsg(err);
      });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowResponse(false);
  };

  const handleAmountChange = (e) => {
    const balanceAmount = campaignData.ethRaised - campaignData.ethFunded;
    const value = e.target.value;
    const minValue = campaignData.minContribAmount;
    if (value < minValue) {
      setFundingAmount(minValue);
      enteredAmountRef.current.value = minValue;
    } else if (value > balanceAmount) {
      setFundingAmount(balanceAmount);
      enteredAmountRef.current.value = balanceAmount;
    } else setFundingAmount(value);
  };

  const handleContributedFunds = async (data) => {
    console.info("handle contribute funds called");
    console.log(data);

    try {
      if (data.contribAmount < campaignData.minContribAmount)
        throw {
          name: "Invalid contribution amount. Transaction aborted",
          message: `Contribution cannot be < ${campaignData.minContribAmount}.`,
        };

      const campaign = Campaign(campaignData.id); // get the campaign
      const accounts = await web3.eth.getAccounts(); // backer account..
      await campaign.methods.contibute().send({
        // register contribution..
        from: accounts[0],
        value: web3.utils.toWei(data.contribAmount, "ether"),
      });

      // after successful contribution..
      reset("", { keepValues: false }); // clear the values entered.
      setIsContributionSuccess(true);
    } catch (err) {
      console.log(err);
      setContributionError(err);
    }
  };

  // components..
  // other modules..
  function ShowCampaignDetails() {
    return (
      <>
        <Box sx={{ margin: 5, width: "40%" }}>
          <Stack direction={"column"} spacing={2}>
            <Typography variant="caption">About Campaign</Typography>
            <Container>
              <Stack spacing={0.8}>
                <Box
                  display={"flex"}
                  flexDirection="row"
                  alignItems={"flex-start"}
                >
                  <Typography variant="h4" gutterBottom>
                    {campaignData.title}
                  </Typography>
                  <Chip
                    label={campaignData.campaignStatus}
                    size="small"
                    color={
                      campaignData.campaignStatus == "ACTIVE"
                        ? "success"
                        : "error"
                    }
                  />
                </Box>
                <Typography variant="body2">
                  {campaignData.description}
                </Typography>

                <Link
                  variant="body2"
                  href={`https://goerli.etherscan.io/address/${campaignData.id}`}
                >
                  View on Goerli Etherscan
                </Link>
              </Stack>
            </Container>
            <ShowContributionDetails />
            <EndCampaign />
          </Stack>
        </Box>
      </>
    );
  }

  function ShowContributionDetails() {
    return (
      <>
        <Typography variant="caption">Contribution Details</Typography>
        <Container>
          <Typography variant="caption">Minimum Contribution amount</Typography>
          <Typography>{campaignData.minContribAmount} ETH</Typography>
        </Container>
        <Container>
          <Typography variant="caption">Goal</Typography>
          <Typography>{`${campaignData.ethRaised}`} ETH</Typography>
        </Container>
        <Container>
          <Typography variant="caption">
            Wallet Address of FundRaiser
          </Typography>
          <Typography>{`${campaignData.createdBy}`}</Typography>
        </Container>
      </>
    );
  }

  function ShowCampaignBalance() {
    return (
      <>
        <Container
          maxWidth="sm"
          sx={{ padding: 0.5, backgroundColor: "#fae588", borderRadius: 3 }}
        >
          <Typography variant="h6">Campaign balance</Typography>
          <Typography variant="caption">
            Amount stored in smart contract.
          </Typography>
          <LinearProgressWithLabel
            value={(campaignData.ethFunded / campaignData.ethRaised) * 100}
          />
          <Typography variant="body2">
            {`${campaignData.ethFunded}`} ETH funded by{" "}
            {`${campaignData.backersCount}`} backers.
          </Typography>
        </Container>
      </>
    );
  }

  function BecomeBacker() {
    return (
      <Container
        sx={{ padding: 0.5, backgroundColor: "#f1faee", borderRadius: 3 }}
        fixed
        maxWidth="sm"
      >
        <Stack direction="column" spacing={1.2}>
          <Typography variant="h6">Be a backer</Typography>
          <Stack direction="row">
            <Typography variant="caption">
              How much would you like to fund?
            </Typography>
            <Typography
              sx={{ fontStyle: "italic", paddingLeft: 1 }}
              variant="caption"
              color="grey"
            >
              ≥ {campaignData.minContribAmount} ETH &amp; ≤{" "}
              {campaignData.ethRaised - campaignData.ethFunded} ETH
            </Typography>
          </Stack>
          {isContributionSuccess == true ? (
            <Alert
              severity="success"
              sx={{ marginTop: 2, marginBottom: 2 }}
              onClose={() => setIsContributionSuccess(false)}
            >
              <AlertTitle>Funded successfully</AlertTitle>
              Thanks for your valuable contributions.
            </Alert>
          ) : (
            <form onSubmit={handleSubmit(handleContributedFunds)}>
              <TextField
                label="Contribution amount"
                type={"number"}
                inputProps={{
                  step: 0.00001,
                  min: campaignData[minAmountKey],
                  max: campaignData[raisedMoneyKey],
                }}
                disabled={formState.isSubmitting}
                {...register("contribAmount", { required: true })}
                helperText="Enter amount in Ether you want to contribute."
                fullWidth
                size="small"
              />
              {contributionError && (
                <Alert
                  severity="error"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  onClose={() => {
                    setContributionError(""); // erase the error msg.
                    window.location.reload(); // re-load the page to get the updated status
                  }}
                >
                  <AlertTitle>{contributionError.name}</AlertTitle>
                  {contributionError.message}
                </Alert>
              )}
              {wallet.status === "connected" ? (
                <LoadingButton
                  variant="contained"
                  type="submit"
                  fullWidth
                  loading={formState.isSubmitting}
                  sx={{ marginTop: 1 }}
                >
                  Contribute Funds
                </LoadingButton>
              ) : (
                <Alert
                  severity="error"
                  sx={{ margin: 2 }}
                  action={
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => wallet.connect()}
                    >
                      Connect
                    </Button>
                  }
                >
                  Please connect your wallet to proceed.
                </Alert>
              )}
            </form>
          )}

          <Typography variant="subtitle2" color="grey">
            Scheme - All or Nothing.
          </Typography>
          <Typography variant="caption" paragraph color="grey">
            The money you fund, will be stored in smart contract that you can
            trust. Your money gets refunded in-case if the project doesn't reach
            goal or cancelled in-between, and transferred if reached goal.
          </Typography>
        </Stack>
      </Container>
    );
  }

  function WithDrawFunds() {
    return (
      <Container
        sx={{ padding: 2, backgroundColor: "#FFE8E3", borderRadius: 3 }}
        fixed
        maxWidth="sm"
      >
        <Typography variant="h6" gutterBottom>
          Withdraw Raised Funds
        </Typography>
        {/* -------- Here.. based on the deadline of the campaign, validate can withdraw or not. */}
        <Alert severity="info" sx={{ marginTop: 1 }}>
          To withdraw raised funds, campaign has to be <strong>ended</strong>
        </Alert>
        <form onSubmit={handleSubmit}>
          <Alert severity="warning" sx={{ marginTop: 1, marginBottom: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  required
                  color="error"
                  name="acceptConditions"
                  value="yes"
                />
              }
              label="I/We understand that, once campaign has ended it cannot be reversed."
              sx={{ padding: 1 }}
            />
          </Alert>

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="error"
          >
            End campaign &amp; withdraw
          </LoadingButton>
        </form>
      </Container>
    );
  }

  function EndCampaign() {
    return (
      <>
        {wallet.account === campaignData.createdBy && (
          // {campaignData.status === "ACTIVE" && (
          <>
            <Typography variant="caption">Danger Zone</Typography>
            <Container
              sx={{
                backgroundColor: "#e5989b",
                padding: 1,
                borderRadius: 3,
              }}
            >
              <Stack direction="row" alignItems={"center"}>
                <Container>
                  <Typography variant="body1">Quit Campaign</Typography>
                  <Typography variant="caption">
                    Once you end a campaign, there is no going back. Please be
                    certain.
                  </Typography>
                </Container>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => setShowEndCampaignConfirmation(true)}
                >
                  End campaign
                </Button>
              </Stack>
            </Container>
          </>
        )}
      </>
    );
  }

  function EndCampaignDialog() {
    return (
      <>
        <StyledModal
          open={showEndCampaignConfirmation}
          onClose={() => setShowEndCampaignConfirmation(false)}
        >
          <Box>
            <Typography>Hello</Typography>
            <Box
              width={400}
              height={280}
              bgcolor={"background.default"}
              color={"text.primary"}
              p={3}
              borderRadius={3}
              display="flex"
              flexDirection={"column"}
              gap={1}
              sx={{ justifyContent: "center" }}
              component="form"
              // onSubmit={abortCampaign}
            >
              <Typography
                variant="h6"
                color="error"
                textAlign="center"
                gutterBottom
              >
                End Campaign
              </Typography>
              <Stack direction="column">
                <TextField
                  label="Why would you like to end campaign?"
                  multiline
                  rows={3}
                  name="campaignEndReason"
                  variant="standard"
                  onChange={(e) => setAbortCampaignMsg(e.target.value)}
                />
                <Typography variant="caption">
                  This reason will be published in campaign page to notify
                  viewers and backers.
                </Typography>
              </Stack>
              <Stack direction={"column"}>
                <FormGroup sx={{ marginBottom: 1.5 }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="I accept that, if I end campaign, all the raised money can be refunded back to the backers."
                    onChange={() => {
                      setAcceptanceStatus(!acceptanceStatus);
                      console.log(acceptanceStatus);
                    }}
                  />
                </FormGroup>
                <Button
                  color="error"
                  variant="contained"
                  disabled={acceptanceStatus == false}
                  onClick={() => abortCampaign()}
                >
                  End Campaign
                </Button>
              </Stack>
            </Box>
          </Box>
        </StyledModal>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Stack
        direction={"row"}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="space-around"
        alignItems="baseline"
      >
        <ShowCampaignDetails />
        <Box sx={{ margin: 10, width: "60%" }}>
          <Stack direction={"column"} spacing={2}>
            <Typography variant="caption">
              Current Status of campaign
            </Typography>
            <ShowCampaignBalance />
            {wallet.account !== campaignData.createdBy ? (
              <>
                <Typography variant="caption" sx={{ margin: 0 }}>
                  Contribute
                </Typography>
                <BecomeBacker />
              </>
            ) : (
              <>
                <Typography variant="caption" sx={{ margin: 0 }}>
                  Withdraw
                </Typography>
                <WithDrawFunds />
              </>
            )}
          </Stack>
        </Box>
      </Stack>
      <EndCampaignDialog />
      <Snackbar
        open={showResponse}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity={responseSeverity}>
          {responseMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ViewCampaign;
