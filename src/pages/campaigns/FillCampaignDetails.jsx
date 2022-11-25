import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
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
// local imports...
import NavBar from "../../components/NavBar";

// service imports..
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Wallet connection..
import { useWallet } from "use-wallet";

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
  async function handleFilledCampaignDetails(e) {
    e.preventDefault();
    console.info("submit called");
    // console.log(title + ", " + deadlineDate);

    await axios({
      method: "POST",
      url: api_url + "create-campaign/",
      data: {
        title: "",
        description: "",
        minContribAmount: "",
        ethRaised: "",
        bannerUrl: "",
        deadline: "" + "T" + "",
        walletAddress: "In testing...",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status == 200)
          // on successful creation..
          navigate("/../campaign/" + response.data.campaignId); //  navigate to campaign page.
        throw Error("testing");
      })
      .catch((err) => {
        // upon error.. be on the same page and show the error.
        setResponseSeverity("error");
        setShowResponse(true);
        setResponseMsg(err);
      })
      .finally(() => {
        console.log("job done");
      });
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

            <form
              autoComplete="on"
              onSubmit={
                handleSubmit((data) => console.log(JSON.stringify(data)))
                // setData(JSON.stringify(data)))
              }
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
                      min: 1,
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
                            new Date().getTime() + 1 * 24 * 60 * 60 * 1000 // +1 day
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
                        color="secondary"
                        name="acceptConditions"
                        value="yes"
                        required
                      />
                    }
                    label="I/We understand that, once these fields are set cannot be updated."
                  />
                </Grid>
              </Grid>
              {error && (
                <Alert sx={{ marginBottom: 2, marginTop: 2 }} severity="error">
                  All fields are required
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={isSubmitting}
              >
                Create Campaign
              </Button>
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
