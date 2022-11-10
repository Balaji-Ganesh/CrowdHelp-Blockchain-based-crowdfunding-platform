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
function FillCampaignDetails() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Campaign Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="campaignTitle"
            name="campaignTitle"
            label="Campaign Title"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="campaignDescription"
            name="campaignDescription"
            label="Campaign Description"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="State" // Where campaign is being held? (State) -- later update this way
            fullWidth
            // drop-down menu of few states
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            // drop-down menu of few states
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="category"
            name="category"
            label="Which category campaign belongs to?"
            fullWidth
            // dropdown menu of few categories
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="amountToBeRaised"
            name="amountToBeRaised"
            label="Amount To be raised (ETH)"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="campaignEndDate"
            name="campaignEndDate"
            label="When campaign ends?"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        {/* 
            Milestones feature in next version..
        <Grid item xs={12} sm={6}>
          <TextField
            id="numMileStones"
            name="numMileStones"
            label="Choose milestones count"
            fullWidth
          />
        </Grid> */}

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="I/We agree that we fulfill the milestones criteria as per the timeline and in-case if can't amount can be refunded to backers."
          />
        </Grid>
      </Grid>
    </>
  );
}

export default FillCampaignDetails;
