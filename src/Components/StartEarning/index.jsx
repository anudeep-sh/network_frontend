import React from "react";
import { Box, Typography, Grid, Paper, Container } from "@mui/material";
import { Colors } from "../../Theme/Theme";
import img1 from "../../Assets/Images/process/registerImg.png";
import img2 from "../../Assets/Images/process/learingImg.png";
import img3 from "../../Assets/Images/process/cardImg.png";
const steps = [
  {
    id: "01",
    title: "Install FI app and register",
    description:
      "Download the FI app, sign up, and complete your registration easily.",
    icon: (
      <img
        src={img1}
        alt="Install FI app"
        style={{ width: "145px", height: "145px" }}
      />
    ),
  },
  {
    id: "02",
    title: "Attend trainings and share financial product links",
    description:
      "Learn from expert training sessions and share financial products with your network.",
    icon: (
      <img
        src={img2}
        alt="Install FI app"
        style={{ width: "145px", height: "145px" }}
      />
    ),
  },
  {
    id: "03",
    title: "Start earning money more than ₹1 Lakh every month",
    description:
      "Boost your income by referring and selling financial products effortlessly.",
    icon: (
      <img
        src={img3}
        alt="Install FI app"
        style={{ width: "145px", height: "auto" }}
      />
    ),
  },
];

const StartEarning = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: { xs: 5, md: 10 },
        backgroundColor: "#F5F5F5",
      }}
    >
      <Container sx={{ px: { xs: 2 } }}>
        <Typography
          variant="subtitle2"
          color={Colors.primaryTextColor}
          sx={{ mb: 1, fontFamily: "Poppins, sans-serif" }}
        >
          WORK PROCESS
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#121212", mb: 4, fontFamily: "Poppins, sans-serif" }}
        >
          Start earning with 3 easy steps
        </Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
          {steps.map((step, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={step.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: "50%",
                  width: "150px",
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  mb: 2,
                  backgroundColor: "#fff",
                }}
              >
                {step.icon}
                <Box
                  sx={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#5D87FF",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {step.id}
                </Box>
              </Paper>
              <Typography
                variant="h6"
                fontWeight="700"
                sx={{ fontFamily: "Poppins, sans-serif", mb: 1 }}
              >
                {step.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "gray",
                  maxWidth: "300px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {step.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StartEarning;
