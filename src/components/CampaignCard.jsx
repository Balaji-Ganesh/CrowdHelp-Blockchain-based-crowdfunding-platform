// library and compoent imports//
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import CardActionArea from "@mui/material/CardActionArea";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ShareIcon from "@mui/icons-material/Share";

function CampaignCard(props) {
  // extract the details..
  const {
    bannerUrl,
    campaignStatus,
    isFavoriteCampaign,
    campaignTitle,
    campaignDescription,
    ethRaised,
    ethFunded,
    daysLeft,
  } = props.details;

  // helpers ..
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Card
        sx={{
          //   height: "100%" -- purpose un-identified.
          display: "flex",
          flexDirection: "column",
        }}
        variant="outlined"
      >
        <CardMedia
          component="img"
          sx={
            {
              // 16:9
              // pt: "56.25%", -- by this, takes large space for card.
            }
          }
          image={bannerUrl}
        />
        <CardActionArea>
          <CardContent sx={{ flexGrow: 1 }}>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography component="p" fontSize={12} color="green">
                {campaignStatus}
              </Typography>
              <Stack direction="row">
                <IconButton color="secondary">
                  {isFavoriteCampaign ? (
                    <FavoriteRoundedIcon size="small" />
                  ) : (
                    <FavoriteBorderRoundedIcon size="small" />
                  )}
                </IconButton>
                <IconButton>
                  <ShareIcon size="small" />
                </IconButton>
              </Stack>
            </Stack>

            <Typography gutterBottom variant="h5" component="h2">
              {campaignTitle}
            </Typography>
            <Typography gutterBottom fontSize={15}>
              {campaignDescription}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" alignItems={"flex-end"}>
                <Typography component="p" fontSize={15}>
                  {`Ξ ${ethFunded} `}
                </Typography>
                <Typography component="p" fontSize={10} color="grey">
                  &nbsp; ETH funded
                </Typography>
              </Stack>
              <Stack direction="row" alignItems={"flex-end"}>
                <Typography component="p" fontSize={15}>
                  {`Ξ ${ethRaised} `}
                </Typography>
                <Typography component="p" fontSize={10} color="grey">
                  &nbsp; ETH raised
                </Typography>
              </Stack>
            </Stack>
            <LinearProgressWithLabel value={(ethFunded/ethRaised)*100} />
            <Stack direction="row" alignItems={"center"}>
              <AccessTimeRoundedIcon />
              <Typography gutterBottom fontSize={14} color="grey">
                &nbsp; {daysLeft} days left
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default CampaignCard;
