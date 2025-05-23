import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import React from "react";
import "./App.css";
import Navbar from "./Pages/Navbar";
import SideBar from "./Pages/Sidebar";
import { useState } from "react";
import {
  Box,
  ThemeProvider,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import DashBoard from "./Pages/Dashboard";
import Network from "./Pages/Network";
import WithDrawal from "./Pages/IncomeHistory";
import Profile from "./Pages/Profile";
import Packages from "./Pages/Packages";
import MyReferrals from "./Pages/Referrals";
import TotalTeams from "./Pages/TotalTeams";
import Transactions from "./Pages/Transactions";
import WithDrawalHistory from "./Pages/TransferPayment";
import Withdraw from "./Pages/Withdraw";
import AddMember from "./Pages/UserQuotas";
import ReferralLink from "./Pages/UserWithdrawal";
import Support from "./Pages/Support";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./Pages/PageNotFound";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import Hubs from "./Pages/Hubs/Hubs";
import UserQuotas from "./Pages/UserQuotas";
import UserWithdrawal from "./Pages/UserWithdrawal";
import PendingUserWithdrawal from "./Pages/ApprovedWithdrawals";
import ApprovedWithdrawals from "./Pages/ApprovedWithdrawals";
import UsersDetailsWallet from "./Pages/UsersDetailsWallet/Index";
import InsurancePolicy from "./Pages/InsurancePolicy";
import { Colors } from "./Theme/Theme/index";
import HospiCash from "./Pages/HospiCash";
import CaRegistration from "./Pages/CaRegistration";
import Loans from "./Pages/Loans";
import CreateFormOptions from "./Pages/CreateFormOptions";
import LandingPage from "./Pages/LandingPage";
import FormResponses from "./Pages/FormResponses";
import FormResponseSubmitted from "./Pages/FormResponseSubmitted";

function App() {
  const [activeSideBar, setActiveSideBar] = useState(false);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const Admin = localStorage.getItem("Role") === "ADMIN";

  const Layout = () => {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [isClosing, setIsClosing] = React.useState(false);

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
    };

    return (
      <>
        <Navbar
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
        <SideBar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Outlet />
      </>
    );
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: Colors.bgColor,
        height: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]} />}
            >
              <Route element={<Layout />}>
                <Route
                  path="/dashboard"
                  element={<DashBoard setActiveSideBar={setActiveSideBar} />}
                />
                <Route
                  path="/hubs"
                  element={<Hubs setActiveSideBar={setActiveSideBar} />}
                />
                    <Route path="/form-responses-submitted" element={<FormResponseSubmitted />} />

                <Route path="/packages" element={<Packages />} />
                <Route path="/network" element={<Network />} />
                <Route path="/my-referrals" element={<MyReferrals />} />
                <Route path="/total-teams" element={<TotalTeams />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route
                  path="/withdrawal-history"
                  element={<WithDrawalHistory />}
                />
                <Route path="/withdrawal" element={<WithDrawal />} />
                <Route path="/insurance-policy" element={<InsurancePolicy />} />
                <Route path="/hospi-cash" element={<HospiCash />} />
                <Route
                  path="/chartered-accountant"
                  element={<CaRegistration />}
                />
                <Route path="/loans" element={<Loans />} />
                <Route path="/profile" element={<Profile />} />
                <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                  <>
                    <Route path="/user-quotas" element={<UserQuotas />} />
                    <Route
                      path="/user-withdrawal"
                      element={<UserWithdrawal />}
                    />
                    <Route
                      path="/approved-withdrawal"
                      element={<ApprovedWithdrawals />}
                    />
                    <Route
                      path="/users-detail-withdrawal"
                      element={<UsersDetailsWallet />}
                    />
                    <Route
                      path="/create-form-options"
                      element={<CreateFormOptions />}
                    />
                    <Route path="/form-responses" element={<FormResponses />} />
                  </>
                </Route>{" "}
                <Route path="/support" element={<Support />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
