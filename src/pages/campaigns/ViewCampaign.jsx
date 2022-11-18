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

// local imports..
import NavBar from "../../components/NavBar";
// service imports..
import axios from "axios";

// stylings..
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const api_url = "http://localhost:4000/api/";

function ViewCampaign() {
  // for testing purpose..
  const etherScanAddress = "0x4d496ccc28058b1d74b7a19541663e21154f9c84"; // some dummy address.
  const minContribAmount = 1.5;
  const fundRaiserWalletAddress = "0x4d496ccc28058b1d74b7a19541663e21154f9c84";
  const backersCount = 15;
  const ethFunded = 20;
  const ethRaised = 70;
  const enteredAmount = 0.75; // set this via ref's and onchange.

  // hooks..
  const [showEndCampaignConfirmation, setShowEndCampaignConfirmation] =
    React.useState(false);
  const [acceptanceStatus, setAcceptanceStatus] = React.useState(false);

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
    const response = await axios.delete(
      api_url + "abort-campaign/1668771224096",
      {
        reason: "--FRONTEND-TESTING--",
      }
    );
    console.log(response);
    if (response.status == 200) {
      console.log(response.data.msg); // SHow this in snackbar.
      setShowEndCampaignConfirmation(false);
      // Re-load the page
    }
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
        <Box
          sx={{ margin: 5, width: "40%" }}

          //   minWidth="fit-content"
        >
          <Stack direction={"column"} spacing={2}>
            <Typography variant="caption">About Campaign</Typography>
            <Container>
              <Stack spacing={0.8}>
                <Typography variant="h4" gutterBottom>
                  Campaign Title
                </Typography>
                <Typography variant="body2">
                  Campaign Description -- short.
                </Typography>

                <Link
                  variant="body2"
                  href={`https://goerli.etherscan.io/address/${etherScanAddress}`}
                >
                  View on Goerli Etherscan
                </Link>
              </Stack>
            </Container>
            <Typography variant="caption">Contribution Details</Typography>
            <Container>
              <Typography variant="caption">
                Minimum Contribution amount
              </Typography>
              <Typography>{`${minContribAmount}`} ETH</Typography>
            </Container>
            <Container>
              <Typography variant="caption">Goal</Typography>
              <Typography>{`${ethRaised}`} ETH</Typography>
            </Container>
            <Container>
              <Typography variant="caption">
                Wallet Address of FundRaiser
              </Typography>
              <Typography>{`${fundRaiserWalletAddress}`}</Typography>
            </Container>
            <Typography variant="caption">Danger Zone</Typography>
            <Container
              sx={{ backgroundColor: "#e5989b", padding: 1, borderRadius: 3 }}
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
          </Stack>
        </Box>

        <Box sx={{ margin: 10, width: "60%" }}>
          <Stack direction={"column"} spacing={2}>
            <Typography variant="caption">
              Current Status of campaign
            </Typography>
            <Container
              maxWidth="sm"
              sx={{ padding: 0.5, backgroundColor: "#fae588", borderRadius: 3 }}
            >
              <Typography variant="h6">Campaign balance</Typography>
              <Typography variant="caption">
                Amount stored in smart contract -- short text
              </Typography>
              <LinearProgressWithLabel value={(ethFunded / ethRaised) * 100} />
              <Typography variant="body2">
                {`${ethFunded}`} ETH funded by {`${backersCount}`} backers.
              </Typography>
            </Container>
            <Typography variant="caption" sx={{ margin: 0 }}>
              Contribute
            </Typography>
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
                    sx={{ fontStyle: "italic" }}
                    variant="caption"
                    color="grey"
                  >
                    above {`${minContribAmount}`} ETH.
                  </Typography>
                </Stack>
                <TextField
                  label="Contribution amount"
                  value={enteredAmount}
                  fullWidth
                ></TextField>
                <Button
                  variant="contained"
                  disabled={enteredAmount < minContribAmount}
                >
                  Contribute {enteredAmount} ETH
                </Button>
                <Typography variant="subtitle2" color="grey">
                  Scheme - All or Nothing.
                </Typography>
                <Typography variant="caption" paragraph color="grey">
                  The money you fund, will be stored in smart contract that you
                  can trust. Your money gets refunded in-case if the project
                  doesn't reach goal or cancelled in-between, and transferred if
                  reached goal.
                </Typography>
              </Stack>
            </Container>
          </Stack>
        </Box>
      </Stack>
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
          >
            <Typography
              variant="h6"
              color="error"
              textAlign="center"
              gutterBottom
              fullWidth
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
              />
              <Typography variant="caption">
                This reason will be published in campaign page to notify viewers
                and backers.
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              <FormGroup sx={{ marginBottom: 1.5 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="I accept that, if I end campaign, all the raised money can be refunded back to the backers."
                  onChange={() => setAcceptanceStatus(!acceptanceStatus)}
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

export default ViewCampaign;
