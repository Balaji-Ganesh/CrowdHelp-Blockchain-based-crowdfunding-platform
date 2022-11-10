// library and compoent imports//
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function CampaignCard() {
  return (
    <>
      <Card
        sx={{
          //   height: "100%" -- purpose un-identified.
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          sx={
            {
              // 16:9
              // pt: "56.25%", -- by this, takes large space for card.
            }
          }
          image="https://source.unsplash.com/random"
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            Campaign Title
          </Typography>
          <Typography>
            Short description of the campaign or motto of the campaign raise.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View</Button>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default CampaignCard;
