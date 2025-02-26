import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Container, Typography } from "@mui/material";
import {
  CreditCard,
  AccountBalance,
  RequestQuote,
  TrendingUp,
  Security,
  CardGiftcard,
  Payments,
  BarChart,
} from "@mui/icons-material";
import InvestmentSection from "../InvestmentSection";
import { Colors } from "../../Theme/Theme";
import CreditCardSection from "../CreditCardSection";
import SavingsAccountSection from "../SavingsAccountSection";
import LoanSection from "../LoanSection";
import InsuranceSection from "../InsuranceSection";
import ReferAndEarnSection from "../ReferAndEarnSection";
import AepsSection from "../AepsSection";
import AffiliateMarketingSection from "../AffiliateMarketingSection";

const SellMoreSection = ({ refs, tabIndex }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  useEffect(() => {
    setActiveTab(tabIndex);
  }, [tabIndex]);
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#ffffff",

        py: { xs: 6, lg: 10 },
      }}
      ref={refs}
    >
      <Container sx={{ px: { xs: 2 } }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: Colors.primaryTextColor,
            textAlign: "left",
            mb: 2,
          }}
        >
          More Sales, More Profit
        </Typography>
        <Tabs
          value={activeTab || tabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs example"
          sx={{
            minHeight: "40px",
            py: 0.5,
            borderRadius: "8px",
            "& .MuiTabs-flexContainer": {},
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              color: "#555",
              fontWeight: 500,
              minHeight: "40px",
              py: 1,

              "&.Mui-selected": {
                color: "#fff",
                backgroundColor: "#5D87FF",
                borderRadius: "8px",
                py: 1,
              },
            },
          }}
        >
          <Tab
            label="Credit Card"
            icon={<CreditCard sx={{ fontSize: "20px" }} />}
            iconPosition="start"
          />
          <Tab
            label="Savings Account"
            icon={<AccountBalance sx={{ fontSize: "20px" }} />}
            iconPosition="start"
          />
          <Tab
            label="Loan"
            icon={<RequestQuote sx={{ fontSize: "20px" }} />}
            iconPosition="start"
          />
          <Tab
            label="Investment"
            icon={<TrendingUp sx={{ fontSize: "20px" }} />}
            iconPosition="start"
          />
          <Tab
            label="Insurance"
            icon={<Security sx={{ fontSize: "20px" }} />}
            iconPosition="start"
          />
          <Tab
            label="Refer & Earn"
            icon={<CardGiftcard sx={{ fontSize: "20px" }} />}
            iconPosition="start"
          />
          <Tab
            label="AEPS"
            icon={<Payments sx={{ fontSize: "20px" }} />}
            iconPosition="start"
          />
          <Tab
            label="Affiliate Marketing"
            icon={<BarChart sx={{ fontSize: "20px" }} />}
            iconPosition="start"
          />
        </Tabs>

        {activeTab === 0 && <CreditCardSection />}
        {activeTab === 1 && <SavingsAccountSection />}
        {activeTab === 2 && <LoanSection />}
        {activeTab === 3 && <InvestmentSection />}
        {activeTab === 4 && <InsuranceSection />}
        {activeTab === 5 && <ReferAndEarnSection />}
        {activeTab === 6 && <AepsSection />}
        {activeTab === 7 && <AffiliateMarketingSection />}
      </Container>
    </Box>
  );
};

export default SellMoreSection;
