import {
  ErrorRounded,
  LocalConvenienceStoreOutlined,
} from "@mui/icons-material";
import {
  Button,
  Container,
  TextField,
  Typography,
  styled,
  Avatar,
  Link,
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";
// local imports...
import NavBar from "../../components/NavBar";

// service imports..
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";

// Wallet connection..
import { useWallet } from "use-wallet";

// smart-contract interaction -- for campaign creation..
import crowdHelp from "../../../utils/contract/crowdHelp";
import web3 from "../../../utils/web3";

const api_url = "http://localhost:4000/api/";

function FillCampaignDetails() {
  const wallet = useWallet();
  const navigate = useNavigate();

  // hooks for getting form data..
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
  });
  const [data, setData] = React.useState("");
  const [error, setError] = React.useState("");

  // hooks to handle acknowledgements..
  // hooks..
  const [responseMsg, setResponseMsg] = React.useState(""); // to display error messages.
  const [showResponse, setShowResponse] = React.useState(false); // To know whether error occured. ⁉ why not use length of error message
  const [responseSeverity, setResponseSeverity] = React.useState("error");

  // helpers..
  async function handleFilledCampaignDetails(data) {
    console.log("ABout to print data");
    console.log(data);
    console.log("deadline: " + data.deadlineDate + " " + data.deadlineTime);
    const timestamp = moment(
      data.deadlineDate + " " + data.deadlineTime,
      "YYYY-MM-DD HH:mm"
    ).valueOf();
    console.log(timestamp);
    console.log("timestamp printed");

    try {
      const accounts = await web3.eth.getAccounts();
      // Create campaign by taking all the details..
      await crowdHelp.methods
        .createCampaign(
          data.title,
          data.description,
          web3.utils.toWei(data.minContribAmount, "ether"),
          web3.utils.toWei(data.ethRaised, "ether"),
          timestamp,
          data.bannerUrl
        )
        .send({
          from: accounts[0],
        });

      // After successful creation..
      ///// REQUIRED: Find way to get the created campaign address, so that, can navigate to that page.
      navigate("/"); // navigate to home page
    } catch (err) {
      // upon error.. be on the same page and show the error.
      setError(err.message);
      console.log(err);
    } finally {
      console.log("job done");
    }
  }

  const StyledDivLayout = styled("div")(({ theme }) => ({
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  }));

  const StyledDivPaper = styled("div")(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  }));

  const StyledContainer = styled(Container)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowResponse(false);
  };

  return (
    <>
      <NavBar />
      <StyledContainer
        sx={{
          width: "80%",
        }}
      >
        <StyledDivLayout>
          <StyledDivPaper>
            <Typography
              variant="h5"
              textAlign={"center"}
              fontWeight="bold"
              sx={{ paddingBottom: 2.5 }}
            >
              Campaign Details
            </Typography>
            {/* Handle wallet connection here.. */}
            {wallet.status !== "connected" ? (
              <Alert
                sx={{ marginBottom: 2 }}
                severity="warning"
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
            ) : (
              wallet.status === "error" && (
                <Alert
                  sx={{ marginBottom: 2 }}
                  severity="error"
                  action={
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => wallet.connect()}
                    >
                      Try again
                    </Button>
                  }
                >
                  Error connecting to wallet.
                </Alert>
              )
            )}

            {/* For displaying errors.. */}
            {error && (
              <Alert sx={{ marginBottom: 2, marginTop: 2 }} severity="error">
                {error}
              </Alert>
            )}
            {errors.title ||
            errors.description ||
            errors.bannerUrl ||
            errors.minContribAmount ||
            errors.ethRaised ||
            errors.walletAddress ||
            errors.deadlineDate ||
            errors.deadlineTime ? (
              <Alert sx={{ marginBottom: 2, marginTop: 2 }} severity="error">
                All fields are required
              </Alert>
            ) : null}

            <form
              autoComplete="on"
              onSubmit={handleSubmit(handleFilledCampaignDetails)}
            >
              <Grid
                container
                spacing={1.5}
                direction="row"
                justify="center"
                alignItems="stretch"
              >
                <Grid item xs={6} spacing={0}>
                  <Box display={"flex"} flexDirection="column" gap={2}>
                    <TextField
                      id="title"
                      {...register("title", { required: true })}
                      label="Campaign Title"
                      size="small"
                      fullWidth
                      disabled={isSubmitting}
                      variant="outlined"
                      helperText="About this campaign in 2-3 words"
                    />
                    <TextField
                      id="minContribAmount"
                      {...register("minContribAmount", { required: true })}
                      label="Minimum contribution amount"
                      size="small"
                      type="number"
                      inputProps={{
                        min: 0,
                        step: 0.00001,
                      }}
                      fullWidth
                      variant="outlined"
                      helperText="How much minimum amount you are expecting from backers?"
                      disabled={isSubmitting}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Grid styl={{ height: "70%" }}>
                    <TextField
                      id="description"
                      name="description"
                      {...register("description", { required: true })}
                      label="Campaign Description"
                      size="small"
                      multiline
                      rows={4.3}
                      fullWidth
                      helperText="Help people know about this campaign. Keep it simple and short."
                      disabled={isSubmitting}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="ethRaised"
                    {...register("ethRaised", { required: true })}
                    label="Goal (ETH)"
                    fullWidth
                    size="small"
                    type="number"
                    helperText="Amount to be raised"
                    inputProps={{
                      // min: 0.00000001,
                      step: 0.00001,
                    }}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="bannerUrl"
                    {...register("bannerUrl", { required: true })}
                    label="Banner Image URL"
                    type="url"
                    size="small"
                    fullWidth
                    title="This image will be shown as a banner"
                    helperText="Preferably from unsplash.com, flaticon.com, pexels.com."
                    disabled={isSubmitting}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ padding: 0, margin: 0 }}>
                    <Typography variant="caption" color="GrayText">
                      Campaign ends at
                    </Typography>
                    <Box display={"flex"} flexDirection="row" gap={2}>
                      <TextField
                        id="deadlineDate"
                        {...register("deadlineDate", { required: true })}
                        type={"date"}
                        inputProps={{
                          min: `${new Date(
                            new Date().getTime() + 1 * 1 * 60 * 60 * 1000 // +1 day
                          )
                            .toJSON()
                            .slice(0, 10)}`,
                        }}
                        size="small"
                        disabled={isSubmitting}
                      />
                      <TextField
                        id="deadlineTime"
                        {...register("deadlineTime", { required: true })}
                        type={"time"}
                        size="small"
                        disabled={isSubmitting}
                      />
                    </Box>
                    <Typography variant="caption" color="GrayText">
                      Please set a reasonable range, neither too short nor too
                      long.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  {/* Just to be aligned with the date&time. */}
                  <Typography variant="caption">&nbsp;</Typography>
                  <TextField
                    required
                    id="walletAddress"
                    name="walletAddress"
                    label="Wallet Address"
                    fullWidth
                    value={wallet.account}
                    inputProps={{
                      readOnly: "read-only",
                    }}
                    title="Read-only value"
                    size="small"
                    helperText={
                      wallet.status === "connected"
                        ? "This is connected wallet's address. To switch please re-login with required wallet."
                        : "Please connect to the wallet"
                    }
                    disabled={isSubmitting}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        required
                        color="secondary"
                        name="acceptConditions"
                        value="yes"
                      />
                    }
                    label="I/We understand that, once these fields are set cannot be updated."
                  />
                </Grid>
              </Grid>
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                variant="contained"
                color="success"
                disabled={isSubmitting}
              >
                Create Campaign
              </LoadingButton>
            </form>
          </StyledDivPaper>
        </StyledDivLayout>
      </StyledContainer>
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

export default FillCampaignDetails;
