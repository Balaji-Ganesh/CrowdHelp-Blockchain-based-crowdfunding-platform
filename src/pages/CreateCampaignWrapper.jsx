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
import FillFundRaiserDetails from "./FillFundRaiserDetails";
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
  "Fundraiser details",
  "Review campaign details",
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <FillCampaignDetails />;
    case 1:
      return <FillFundRaiserDetails />;
    case 2:
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

function CreateCampaign() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <Box>
      <StyledDivLayout>
        <StyledDivPaper>
          <Typography component="h1" variant="h4" align="center">
            Create Campaign
          </Typography>
          <StyledStepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </StyledStepper>
          <>
            {activeStep == steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
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
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </>
            )}
          </>
        </StyledDivPaper>
      </StyledDivLayout>
    </Box>
  );
}

export default CreateCampaign;
