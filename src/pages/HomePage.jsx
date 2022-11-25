import React, { useEffect } from "react";

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
import CircularProgress from "@mui/material/CircularProgress";

// local imports..
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CampaignCard from "../components/CampaignCard";

// service imports..
import axios from "axios";

const api_url = "http://localhost:4000/api/";

function HomePage() {
  // for navigation..
  const navigate = useNavigate();

  // hooks..
  const [activeCampaigns, setActiveCampaigns] = React.useState([]);

  useEffect(() => {
    // console.log("useEffect called");
    let ignore = false;
    // fetch the campaigns..
    const fetchData = async () => {
      const response = await axios.get(api_url + "active-campaigns/3");
      console.info(response.data);
      if (!ignore && response.status == 200) setActiveCampaigns(response.data);
    };

    fetchData(); // call the function to fetch the data

    return () => {
      ignore = true; // to avoid rendering multiple times..
    };
  }, []);

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
              <Box>
                <Typography variant="h5">
                  Take part in active campaigns..
                </Typography>
                <Typography variant="caption">
                  Top {activeCampaigns.length} recent active campaigns..
                </Typography>
              </Box>
              <Button onClick={() => navigate("/active-campaigns")}>
                View more
              </Button>
            </Stack>
            <Container sx={{ py: 2 }} maxWidth="md">
              {/* End hero unit */}
              {/* load as long as data is not fetched. */}
              {activeCampaigns.length == 0 && (
                <CircularProgress color="success" />
              )}
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
