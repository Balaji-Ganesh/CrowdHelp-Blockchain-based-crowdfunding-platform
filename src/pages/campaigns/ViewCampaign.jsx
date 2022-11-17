// UI imports..
import React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Box, Button } from "@mui/material";
import { Container, Link, TextField, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// service imports..
import NavBar from "../../components/NavBar";

function ViewCampaign() {
  // for testing purpose..
  const etherScanAddress = "0x4d496ccc28058b1d74b7a19541663e21154f9c84"; // some dummy address.
  const minContribAmount = 1.5;
  const fundRaiserWalletAddress = "0x4d496ccc28058b1d74b7a19541663e21154f9c84";
  const backersCount = 15;
  const ethFunded = 20;
  const ethRaised = 70;
  const enteredAmount = 0.75; // set this via ref's and onchange.

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
          </Stack>
        </Box>

        <Box sx={{ margin: 10, width: "60%" }}>
          <Stack direction={"column"} spacing={2}>
            <Typography variant="caption">
              Current Status of campaign
            </Typography>
            <Container
              maxWidth="sm"
              sx={{ padding: 0.5, backgroundColor: "#f1faee", borderRadius: 3 }}
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
    </>
  );
}

export default ViewCampaign;
