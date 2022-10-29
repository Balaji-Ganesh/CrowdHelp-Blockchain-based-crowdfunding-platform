// library and component imports..
import "./App.css";

// custom imports
// import Feed from "./components/Feed";
import { Box } from "@mui/material";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateCampaign from "./pages/CreateCampaignWrapper";
import FillCampaignDetails from "./pages/FillCampaignDetails";

function App() {
  return (
    <Box className="App">
      <CreateCampaign />
    </Box>
  );
}

export default App;
