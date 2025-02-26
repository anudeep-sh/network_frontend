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

const AffiliateMarketingSection = () => {
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
            Earn More with Affiliate Marketing!
          </Typography>
          <List sx={{ py: 0 }}>
            {[
              "Promote top brands and earn commissions.",
              "Get paid for every successful sale or lead.",
              "Easy tracking and fast payouts.",
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
            src="https://lottie.host/c6a5b4f9-043d-4ad4-8b94-314b1f9a1dda/rT1oUoWghA.lottie"
            loop
            autoplay
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AffiliateMarketingSection;
