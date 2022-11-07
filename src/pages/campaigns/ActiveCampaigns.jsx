// library and component imports..
import React from "react";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// local imports
import CampaignCard from "../../components/CampaignCard";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

const cards = [1, 2, 3, 4, 5];

function ActiveCampaigns() {
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
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <CampaignCard />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default ActiveCampaigns;
