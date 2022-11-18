// library and component imports..
import React, { useEffect } from "react";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

// local imports
import CampaignCard from "../../components/CampaignCard";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

// service imports..
import axios from "axios";

const cards = [1, 2, 3, 4, 5];
const data = [
  {
    bannerUrl:
      "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
    campaignStatus: "FUNDING IN PROGRESS",
    isFavoriteCampaign: false,
    title: "Covid vaccinesupply",
    description:
      "Help us in reaching covid-19 vaccines to reach people out of the city.",
    ethRaised: "90",
    ethFunded: "10",
    daysLeft: "6",
  },
  {
    bannerUrl:
      "https://images.unsplash.com/photo-1584744982491-665216d95f8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    campaignStatus: "FUNDING IN PROGRESS",
    isFavoriteCampaign: true,
    title: "Sanitation kits distribution",
    description:
      "Take part in covid-19 prevention by helping us in distributing sanitation kits to the needy.",
    ethRaised: "50",
    ethFunded: "8",
    daysLeft: "13",
  },
  {
    bannerUrl:
      "https://images.unsplash.com/photo-1619025873875-59dfdd2bbbd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YW1idWxhbmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    campaignStatus: "FUNDING IN PROGRESS",
    isFavoriteCampaign: false,
    title: "Upgrading Emergency vehicles",
    description:
      "Due to current pandemic, emergency vehicles lacking regular services due to lack of amount, help us to help them.",
    ethRaised: "80",
    ethFunded: "59",
    daysLeft: "5",
  },
  {
    bannerUrl:
      "https://images.unsplash.com/photo-1513224502586-d1e602410265?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8SUNVfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    campaignStatus: "FUNDING IN PROGRESS",
    isFavoriteCampaign: true,
    title: "Increasing critical care items",
    description:
      "Govt. hospitals facing lack of equipment. Please lend a hand to buy more such items.",
    ethRaised: "120",
    ethFunded: "98",
    daysLeft: "6",
  },
  {
    bannerUrl:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=940&q=80",
    campaignStatus: "FUNDING IN PROGRESS",
    isFavoriteCampaign: false,
    title: "Medicines supply",
    description:
      "Due to pandemic, people are facing economical crisis. Help us to save their lives.",
    ethRaised: "30",
    ethFunded: "28",
    daysLeft: "2",
  },
];

const api_url = "http://localhost:4000/api/";

function ActiveCampaigns() {
  // hooks..
  const [activeCampaigns, setActiveCampaigns] = React.useState([]);

  useEffect(() => {
    console.log("useEffect called");
    let ignore = false;
    // fetch the campaigns..
    const fetchData = async () => {
      const response = await axios.get(api_url + "active-campaigns/10");
      console.info(response.data);
      if (!ignore && response.status == 200) setActiveCampaigns(response.data);
    };

    fetchData(); // call the function to fetch the data

    return () => {
      ignore = true; // to avoid rendering multiple times..
    };
  }, []);

  return (
    <>
      <NavBar />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Active Campaigns
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              A list of active campaigns that are running currently and in need
              of contributors like you. Join hands with fund raisers to fulfill
              the noble cause.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}

          <Grid container spacing={4}>
            {activeCampaigns.map((activeCampaign, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4}>
                <CampaignCard details={activeCampaign} />
              </Grid>
            ))}
          </Grid>
          {/* load as long as data is not fetched. */}
          {activeCampaigns.length == 0 && <CircularProgress color="success" />}
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default ActiveCampaigns;
