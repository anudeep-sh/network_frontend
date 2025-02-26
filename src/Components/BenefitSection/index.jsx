import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Colors } from "../../Theme/Theme";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";

const benefits = [
  {
    title: "Earn more than ₹1 Lakh every month",
    description:
      "Sell financial products with Fi and make extra income every month",
    icon: (
      <MonetizationOnOutlinedIcon fontSize="large" sx={{ color: "#5D87FF" }} />
    ),
  },
  {
    title: "Work from Anywhere & Anytime",
    description:
      "You don't need to go to an office or follow fixed working hours—we are flexible",
    icon: <WorkOutlineIcon fontSize="large" sx={{ color: "#5D87FF" }} />,
  },
  {
    title: "Minimal Investment Business",
    description:
      "Find customers and earn money online with minimal investment like you always wanted",
    icon: (
      <BusinessCenterOutlinedIcon fontSize="large" sx={{ color: "#5D87FF" }} />
    ),
  },
  {
    title: "Instant Payout",
    description:
      "No more waiting for weeks to get your sales earning! Get your online earning the moment your sale is a success",
    icon: (
      <AccountBalanceWalletOutlinedIcon
        fontSize="large"
        sx={{ color: "#5D87FF" }}
      />
    ),
  },
  {
    title: "Attend Trainings",
    description:
      "Get trained by our experts and enroll for online courses to learn how to sell and earn money online",
    icon: <SchoolOutlinedIcon fontSize="large" sx={{ color: "#5D87FF" }} />,
  },
];

const BenefitSection = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: { xs: 5, md: 10 },
        pb: { xs: 5, md: 8 },
        backgroundColor: "#FEFEFE",
      }}
    >
      <Container sx={{ px: { xs: 2 }, textAlign: "left" }}>
        <Typography
          variant="subtitle2"
          color={Colors.primaryTextColor}
          sx={{
            mb: 1,
            fontFamily: "Poppins, sans-serif",
            textTransform: "uppercase",
          }}
        >
          Invite. Refer. Earn. Repeat!{" "}
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#121212", mb: 4, fontFamily: "Poppins, sans-serif" }}
        >
          Unlock extra income for all your needs
        </Typography>
        <Grid container spacing={2} justifyContent="flex-start">
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  gap: "10px",
                  textAlign: "left",
                  transition: "0.3s",
                  borderRadius: "8px",
                  "&:hover": {
                    boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.07)",
                  },
                }}
              >
                {benefit.icon}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "500", color: "#343F52" }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 0.5, color: "#60697B" }}
                  >
                    {benefit.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BenefitSection;
