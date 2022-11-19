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
import React from "react";
import NavBar from "../../components/NavBar";
function FillCampaignDetails() {
  // helpers..
  function handleFilledCampaignDetails(e) {
    e.preventDefault();
    console.info("submit called");
    const data = new FormData(event.currentTarget);
    console.log(data.getAll());
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
            <form autoComplete="off" onSubmit={handleFilledCampaignDetails}>
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
                      required
                      id="campaignTitle"
                      name="campaignTitle"
                      label="Campaign Title"
                      size="small"
                      fullWidth
                      variant="outlined"
                      helperText="About this campaign in 2-3 words"
                    />
                    <TextField
                      required={true}
                      id="minContribAmount"
                      name="minContribAmount"
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
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Grid styl={{ height: "70%" }}>
                    <TextField
                      id="campaignDescription"
                      name="campaignDescription"
                      label="Campaign Description"
                      size="small"
                      multiline
                      rows={4.3}
                      fullWidth
                      required
                      helperText="Help people know about this campaign. Keep it simple and short."
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="amountToBeRaised"
                    name="amountToBeRaised"
                    label="Goal (ETH)"
                    fullWidth
                    size="small"
                    type="number"
                    helperText="Amount to be raised"
                    inputProps={{
                      min: 1,
                      step: 0.00001,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="bannerUrl"
                    name="bannerUrl"
                    label="Banner Image URL"
                    size="small"
                    fullWidth
                    inputProps={{
                      pattern:
                        "http(s?)(://)((www.)?)(([^.]+).)?([a-zA-z0-9-_]+)(.com|.net|.gov|.org|.in)(/[^s]*)?",
                    }}
                    title="This image will be shown as a banner"
                    helperText="Preferably from unsplash.com, flaticon.com, pexels.com."
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ padding: 0, margin: 0 }}>
                    <Typography variant="caption" color="GrayText">
                      Campaign ends at
                    </Typography>
                    <Box display={"flex"} flexDirection="row" gap={2}>
                      <TextField
                        required
                        id="deadline"
                        name="deadline"
                        // label="'Deadline'"
                        // fullWidth
                        type={"date"}
                        // placeholder={new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toJSON().slice(0, 10)}
                        inputProps={{
                          min: `${new Date(
                            new Date().getTime() + 1 * 24 * 60 * 60 * 1000 // +1 day
                          )
                            .toJSON()
                            .slice(0, 10)}`,
                          s,
                        }}
                        size="small"
                        // helperText="Set a reasonable range, neither too short nor too long."
                      />
                      <TextField
                        required
                        id="deadline"
                        name="deadline"
                        // label="'Deadline'"
                        // fullWidth
                        type={"time"}
                        // placeholder={new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toJSON().slice(11, 16)}
                        size="small"
                        // helperText="Set a reasonable range, neither too short nor too long."
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
                    id="campaignEndDate"
                    name="campaignEndDate"
                    label="Wallet Address"
                    fullWidth
                    value={"0x123123123"}
                    inputProps={{
                      readOnly: "read-only",
                    }}
                    title="Read-only value"
                    size="small"
                    helperText="This is connected wallet's address. To switch please re-login with required wallet."
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        name="saveAddress"
                        value="yes"
                        required
                      />
                    }
                    label="I/We understand that, once these fields are set cannot be updated."
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="success">
                Create Campaign
              </Button>
            </form>
          </StyledDivPaper>
        </StyledDivLayout>
      </StyledContainer>
    </>
  );
}

export default FillCampaignDetails;
