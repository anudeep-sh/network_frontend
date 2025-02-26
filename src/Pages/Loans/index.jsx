import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PersonalLoan from "../../Components/PersonalLoan";
import { SideBarWidth } from "../../utils/SideBarWidth";
import BusinessLoan from "../../Components/BusinessLoan";
import HomeLoan from "../../Components/HomeLoan";


const Loans = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <Box
      sx={{
        // p: 2,
        width: {
          xs: "100%",
          md: `calc(100% - ${SideBarWidth}px)`,
        },
        ml: { md: `${SideBarWidth}px` },
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Personal Loan" sx={{textTransform:'capitalize'}}/>
        <Tab label="Business Loan" sx={{textTransform:'capitalize'}}/>
        <Tab label="Home Loan" sx={{textTransform:'capitalize'}}/>
      </Tabs>
      {activeTab === 0 && <PersonalLoan />}
      {activeTab === 1 && <BusinessLoan />}
      {activeTab === 2 && <HomeLoan />}
    </Box>
  );
};

export default Loans;
