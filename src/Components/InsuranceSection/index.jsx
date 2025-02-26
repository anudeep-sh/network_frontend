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

const InsuranceSection = () => {
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
            Unexpected expenses? Secure them with insurance
          </Typography>
          <List sx={{ py: 0 }}>
            {[
              "Affordable premiums",
              "Hassle-free claims",
              "Wide coverage options",
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
            src="https://lottie.host/73aab282-3141-4a47-bf8b-5316c46be523/lNAsXfY8Nr.lottie"
            loop
            autoplay
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InsuranceSection;
