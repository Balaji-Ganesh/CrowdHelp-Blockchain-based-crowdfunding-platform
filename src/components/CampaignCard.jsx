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

function CampaignCard() {
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
          image="https://source.unsplash.com/random"
          alt="random"
        />
        <CardActionArea>
          <CardContent sx={{ flexGrow: 1 }}>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography component="p" fontSize={12} color="green">
                FUNDING IN PROGRESS
              </Typography>
              <Stack direction="row">
                <IconButton color="secondary">
                  <FavoriteRoundedIcon size="small" />
                  {/* <FavoriteBorderRoundedIcon size="small" /> */}
                </IconButton>
                <IconButton>
                  <ShareIcon size="small" />
                </IconButton>
              </Stack>
            </Stack>

            <Typography gutterBottom variant="h5" component="h2">
              Campaign Title
            </Typography>
            <Typography gutterBottom fontSize={15}>
              Short description of the campaign or motto of the campaign raise.
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" alignItems={"flex-end"}>
                <Typography component="p" fontSize={15}>
                  {`Ξ 35 `}
                </Typography>
                <Typography component="p" fontSize={10} color="grey">
                  &nbsp; ETH raised
                </Typography>
              </Stack>
              <Stack direction="row" alignItems={"flex-end"}>
                <Typography component="p" fontSize={15}>
                  {`Ξ 100 `}
                </Typography>
                <Typography component="p" fontSize={10} color="grey">
                  &nbsp; ETH pledged
                </Typography>
              </Stack>
            </Stack>
            <LinearProgressWithLabel value={15} />
            <Stack direction="row" alignItems={"center"}>
              <AccessTimeRoundedIcon />
              <Typography gutterBottom fontSize={14} color="grey">
                &nbsp; 9 days left
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default CampaignCard;
