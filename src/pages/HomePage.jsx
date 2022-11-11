import React from "react";

// UI imports
import { Stack } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

// local imports..
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CampaignCard from "../components/CampaignCard";

function HomePage() {
  // for navigation..
  const navigate = useNavigate();
  // dummy data to show campaigns -- later in next iteration, connects with API
  const activeCampaigns = [
    {
      bannerUrl:
        "https://images.unsplash.com/photo-1619025873875-59dfdd2bbbd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YW1idWxhbmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      campaignStatus: "FUNDING IN PROGRESS",
      isFavoriteCampaign: false,
      campaignTitle: "Upgrading Emergency vehicles",
      campaignDescription:
        "Due to current pandemic, emergency vehicles lacking regular services due to lack of amount, help us to help them.",
      ethRaised: "80",
      ethFunded: "59",
      daysLeft: "5",
    },

    {
      bannerUrl:
        "https://images.unsplash.com/photo-1584744982491-665216d95f8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      campaignStatus: "FUNDING IN PROGRESS",
      isFavoriteCampaign: true,
      campaignTitle: "Sanitation kits distribution",
      campaignDescription:
        "Take part in covid-19 prevention by helping us in distributing sanitation kits to the needy.",
      ethRaised: "50",
      ethFunded: "8",
      daysLeft: "13",
    },
    {
      bannerUrl:
        "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
      campaignStatus: "FUNDING IN PROGRESS",
      isFavoriteCampaign: false,
      campaignTitle: "Covid vaccinesupply",
      campaignDescription:
        "Help us in reaching covid-19 vaccines to reach people out of the city.",
      ethRaised: "90",
      ethFunded: "10",
      daysLeft: "6",
    },
    {
      bannerUrl:
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=940&q=80",
      campaignStatus: "FUNDING IN PROGRESS",
      isFavoriteCampaign: false,
      campaignTitle: "Medicines supply",
      campaignDescription:
        "Due to pandemic, people are facing economical crisis. Help us to save their lives.",
      ethRaised: "30",
      ethFunded: "28",
      daysLeft: "2",
    },
    {
      bannerUrl:
        "https://images.unsplash.com/photo-1513224502586-d1e602410265?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8SUNVfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      campaignStatus: "FUNDING IN PROGRESS",
      isFavoriteCampaign: true,
      campaignTitle: "Increasing critical care items",
      campaignDescription:
        "Govt. hospitals facing lack of equipment. Please lend a hand to buy more such items.",
      ethRaised: "120",
      ethFunded: "98",
      daysLeft: "6",
    },
  ];

  return (
    <Box className="App">
      <NavBar />
      {/* <Stack direction="row" spacing={2}></Stack> */}
      <CssBaseline />
      <Container
        component="main"
        sx={{ mt: 8, mb: 2 }}
        justifyContent="center"
        maxWidth="md"
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            🧑‍🤝‍🧑 Crowd Help :💰
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {"Get Help from Crowd..!!"}
            {" Raise a campaign to help the needy."}
          </Typography>
          <Typography variant="body1">Welcome 👋 to the community.</Typography>
          <Typography variant="body1">Development in progress 🚧.</Typography>
        </Box>
        <Box sx={{ mt: 4, mb: 2 }}>
          <Stack>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems="center"
              // width={10}
            >
              <Typography variant="h5">
                Take part in active campaigns..
              </Typography>
              <Button onClick={() => navigate("/active-campaigns")}>
                View more
              </Button>
            </Stack>
            <Container sx={{ py: 2 }} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {activeCampaigns.map((activeCampaign, idx) => (
                  <Grid item key={idx} xs={12} sm={6} md={4}>
                    <CampaignCard details={activeCampaign} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default HomePage;
