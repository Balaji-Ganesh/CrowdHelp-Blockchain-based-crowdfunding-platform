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
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import React from "react";
import FillCampaignDetails from "./FillCampaignDetails";
import SetMileStones from "./SetMileStones";
import ReviewCampaignDetails from "./ReviewCampaignDetails";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        CrowdHelp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = [
  "Campaign Details",
  // "Set Milestones", -- next iteration feature
  // "Review campaign details", --- this feature needs milestones to be set, else meaning-less.
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <FillCampaignDetails />;
    // case 1:
    //   return <SetMileStones />; -- next iteration feature
    case 1:
      return <ReviewCampaignDetails />;
    default:
      throw new Error("Unknown step");
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

const StyledStepper = styled(Stepper)(({ theme }) => ({
  padding: theme.spacing(3, 0, 5),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "80%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "40%",
  },
}));
function CreateCampaignWrapper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <StyledContainer
      sx={{
        width: "80%",
      }}
    >
      <Box>
        <StyledDivLayout>
          <StyledDivPaper>
            <Typography component="h1" variant="h4" align="center">
              Create Campaign
            </Typography>
            <>
              {activeStep == steps.length ? (
                <>
                  <Typography variant="h5" gutterBottom>
                    Welcome to the community..!!
                  </Typography>
                  <Typography variant="subtitle3">
                    Thanks for joining in our team to make this world a better
                    place to live.
                  </Typography>
                  <Typography variant="subtitle1">
                    Campaign has created successfully. An acknowledgement will
                    be sent to your registered maill-id.
                  </Typography>
                </>
              ) : (
                <>
                  {getStepContent(activeStep)}
                  <div>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack}>Back</Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1
                        ? "Create Campaign"
                        : "Next"}
                    </Button>
                  </div>
                </>
              )}
            </>
          </StyledDivPaper>
        </StyledDivLayout>
      </Box>
    </StyledContainer>
  );
}

export default CreateCampaignWrapper;
