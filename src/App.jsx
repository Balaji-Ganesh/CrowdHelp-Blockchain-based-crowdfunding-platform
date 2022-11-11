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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
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
              <AuthProtectedRoute>
                <CreateCampaignWrapper />
              </AuthProtectedRoute>
            }
          />
          <Route path="/active-campaigns" element={<ActiveCampaigns />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
