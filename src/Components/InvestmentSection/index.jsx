import React from "react";
import {
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const InvestmentSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        p: { md: 4 },
        pb: 0,
        pt: 4,
      }}
    >
      <Grid container spacing={{ xs: 0, md: 4 }} alignItems="center">
        <Grid item xs={12} md={6} textAlign={"left"}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#333", mb: 2 }}
          >
            Grow Your Wealth with Smart Investments
          </Typography>
          <List sx={{ py: 0 }}>
            {[
              "Invest in Mutual Funds, Stocks & Bonds",
              "Zero commission fees on investments",
              "Instant account setup & easy withdrawals",
            ].map((item, index) => (
              <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: "32px" }}>
                  <CheckCircleIcon sx={{ color: "#4CAF50" }} />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent="center"
          sx={{ mt: { xs: 4, md: 0 } }}
        >
          <DotLottieReact
            src="https://lottie.host/1748398b-1a4d-4ee1-b637-5b2df019f7b0/EUOo5KtNog.lottie"
            loop
            autoplay
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InvestmentSection;
