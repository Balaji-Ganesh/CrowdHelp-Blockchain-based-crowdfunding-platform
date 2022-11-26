// library and component imports..
import "./App.css";

// custom imports
// import Feed from "./components/Feed";
import { Box } from "@mui/material";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateCampaignWrapper from "./pages/campaigns/CreateCampaignWrapper";
import FillCampaignDetails from "./pages/campaigns/FillCampaignDetails";
import ReviewCampaignDetails from "./pages/campaigns/ReviewCampaignDetails";
import HomePage from "./pages/HomePage";
import ActiveCampaigns from "./pages/campaigns/ActiveCampaigns";
import AuthProvider from "./contexts/AuthContext";
import Profile from "./pages/Profile";
import ViewCampaign from "./pages/campaigns/ViewCampaign";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";

// For wallet connection & usage..
import { UseWalletProvider } from "use-wallet";

function App() {
  return (
    <UseWalletProvider
      chainId={4}
      connectors={{
        walletconnect: {
          rpcUrl:
            "https://goerli.infura.io/v3/eaf842956c36444c8aaf54163a47e0d2",
        },
      }}
    >
      <Router>
        <AuthProvider>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/profile"
              element={
                <AuthProtectedRoute>
                  <Profile />
                </AuthProtectedRoute>
              }
            />
            <Route
              path="/create-campaign"
              element={
                // <AuthProtectedRoute>
                <FillCampaignDetails />
                // {/* </AuthProtectedRoute> */}
              }
            />
            <Route path="/active-campaigns" element={<ActiveCampaigns />} />
            <Route path="/campaign/*" element={<ViewCampaign />} />
          </Routes>
        </AuthProvider>
      </Router>
    </UseWalletProvider>
  );
}

export default App;
