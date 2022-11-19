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
import NavBar from "../../components/NavBar";
function FillCampaignDetails() {
  // hooks ..
  // figure out why this way is failing..
  // const [title, setTitle] = React.useState("");
  // const [description, setDescription] = React.useState("");
  // const [minContribAmount, setMinContribAmount] = React.useState(0.0);
  // const [ethRaised, setEthRaised] = React.useState("");
  // const [bannerUrl, setBannerUrl] = React.useState("");
  // const [deadlineDate, setDeadlineDate] = React.useState("");
  // const [deadlineTime, setDeadlineTime] = React.useState("");

  const titleRef = React.useRef("");
  const descriptionRef = React.useRef("");
  const minContribAmountRef = React.useRef(0.0);
  const ethRaisedRef = React.useRef(0.0);
  const bannerUrlRef = React.useRef("");
  const deadlineDateRef = React.useRef("");
  const deadlineTimeRef = React.useRef("");

  const handleChange = (name, value) => {
    // const { name, value } = e.target;
    console.log(name + ":" + value);
    // let prevValue = formValues[name];
    // console.log(formValues);
    // setFormValues({ [name]: value });
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  // helpers..
  function handleFilledCampaignDetails(e) {
    e.preventDefault();
    console.info("submit called");
    // console.log(title + ", " + deadlineDate);
    const data = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      minContribAmount: minContribAmountRef.current.value,
      ethRaised: ethRaisedRef.current.value,
      bannerUrl: bannerUrlRef.current.value,
      deadlineDate: deadlineDateRef.current.value,
      deadlineTime: deadlineTimeRef.current.value,
    };
    console.log(data);
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
            <form autoComplete="on" onSubmit={handleFilledCampaignDetails}>
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
                      id="title"
                      name="title"
                      label="Campaign Title"
                      size="small"
                      fullWidth
                      variant="outlined"
                      helperText="About this campaign in 2-3 words"
                      //// onChange={(e) =>
                      //   // setTitle(e.target.value)
                      //   console.log(e.target.value)
                      // }

                      inputRef={titleRef}
                    ></TextField>
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
                      //onChange={(e) =>setMinContribAmount(e.target.valueAsNumber) }
                      inputRef={minContribAmountRef}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Grid styl={{ height: "70%" }}>
                    <TextField
                      id="description"
                      name="description"
                      label="Campaign Description"
                      size="small"
                      multiline
                      rows={4.3}
                      fullWidth
                      required
                      helperText="Help people know about this campaign. Keep it simple and short."
                      //onChange={(e) => setDescription(e.target.value)}
                      inputRef={descriptionRef}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="ethRaised"
                    name="ethRaised"
                    label="Goal (ETH)"
                    fullWidth
                    size="small"
                    type="number"
                    helperText="Amount to be raised"
                    inputProps={{
                      min: 1,
                      step: 0.00001,
                    }}
                    //onChange={(e) => setEthRaised(e.target.valueAsNumber)}
                    inputRef={ethRaisedRef}
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
                    //onChange={(e) => setBannerUrl(e.target.value)}
                    inputRef={bannerUrlRef}
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
                        id="deadlineDate"
                        name="deadlineDate"
                        type={"date"}
                        inputProps={{
                          min: `${new Date(
                            new Date().getTime() + 1 * 24 * 60 * 60 * 1000 // +1 day
                          )
                            .toJSON()
                            .slice(0, 10)}`,
                        }}
                        size="small"
                        //onChange={(e) => setDeadlineDate(e.target.valueAsDate)}
                        inputRef={deadlineDateRef}
                      />
                      <TextField
                        required
                        id="deadlineTime"
                        name="deadlineTime"
                        type={"time"}
                        size="small"
                        //onChange={(e) => setDeadlineTime(e.target.value)}
                        inputRef={deadlineTimeRef}
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
                    value={"0x123123123 - set from credentials"}
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
