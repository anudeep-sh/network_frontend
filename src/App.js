import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import React from "react";
import "./App.css";
import Navbar from "./Pages/Navbar";
import SideBar from "./Pages/Sidebar";
import { useState } from "react";
import { ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
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

function App() {
  const [activeSideBar, setActiveSideBar] = useState(false);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const Admin = localStorage.getItem("Role" )==="ADMIN";
  console.log(Admin, "admin");
  const Layout = () => {
    return (
      <>
        <Navbar
          activeSideBar={activeSideBar}
          setActiveSideBar={setActiveSideBar}
        />
        {!isMediumScreen && (
          <SideBar
            activeSideBar={activeSideBar}
            setActiveSideBar={setActiveSideBar}
          />
        )}
        {activeSideBar && (
          <SideBar
            activeSideBar={activeSideBar}
            setActiveSideBar={setActiveSideBar}
          />
        )}
        <Outlet />
      </>
    );
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#181818",
        height: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route
                  path="/dashboard"
                  element={<DashBoard setActiveSideBar={setActiveSideBar} />}
                />
                <Route
                  path="/hubs"
                  element={<Hubs setActiveSideBar={setActiveSideBar} />}
                />
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
                <Route path="/profile" element={<Profile />} />
                {Admin && (
                  <>
                    <Route path="/user-quotas" element={<UserQuotas setActiveSideBar={setActiveSideBar} />} />
                    <Route path="/user-withdrawal" element={<UserWithdrawal setActiveSideBar={setActiveSideBar}/>} />
                  </>
                )}
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
