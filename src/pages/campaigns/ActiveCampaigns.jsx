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
