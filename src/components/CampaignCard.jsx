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

// service imports..
import { useNavigate } from "react-router-dom";

function CampaignCard(props) {
  const navigate = useNavigate();

  // extract the details..
  const {
    bannerUrl,
    campaignStatus,
    isFavoriteCampaign,
    title,
    description,
    ethRaised,
    ethFunded,
    deadline,
    id,
  } = props.details;

  // Find the no. of days left..
  const today = Date.now();
  console.log(deadline);
  console.log(new Date(deadline));
  const diffTime = Math.abs(today - new Date(deadline)); // get difference in milli-seconds
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // find diff in days.
  console.log(daysLeft);

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
          <CardContent
            sx={{ flexGrow: 1 }}
            onClick={() => navigate(`/../campaign/${id}`)}
          >
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                component="p"
                fontSize={12}
                color={
                  campaignStatus == "ACTIVE" || campaignStatus == "SUCCESS"
                    ? "green"
                    : "red"
                }
              >
                {campaignStatus}
              </Typography>
              <IconButton>
                <ShareIcon size="small" />
              </IconButton>
            </Stack>

            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography
              gutterBottom
              fontSize={15}
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              {description}
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
            <LinearProgressWithLabel value={(ethFunded / ethRaised) * 100} />
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
