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

const ReferAndEarnSection = () => {
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
            Earn rewards by referring your friends!
          </Typography>
          <List sx={{ py: 0 }}>
            {[
              "Instant rewards on every successful referral.",
              "No limit on how much you can earn.",
              "Easy tracking and quick withdrawals.",
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
            src="https://lottie.host/e1c879b6-c776-4d98-a52f-cf788031e3ff/mZZNC07EiJ.lottie"
            loop
            autoplay
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReferAndEarnSection;
