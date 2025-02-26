import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Colors } from "../../Theme/Theme";
import heroProduct from "../../Assets/Images/hero/ProductImg.png";
const HeroSection = () => {
  const handleDownload = () => {
    window.open(
      "https://drive.google.com/file/d/1rYqpMt9HtshOU9Qeo87OKdx9zen32Vty/view",
      "_blank"
    );
  };
  return (
    <Box
      sx={{
        position: "relative",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "auto",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#FFFAF0",
      }}
    >
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: { xs: "column", md: "row" },
          flexGrow: 1,
          px: { xs: 2 },
          py: { xs: 4, lg: 5 },
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", lg: "50%!important" },
            textAlign: "left",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "600",
              fontSize: { xs: "40px", md: "48px" },
              lineHeight: 1.3,
            }}
            color={"#1C1C1C"}
            mb={2}
          >
            Sell financial products and earn real money online!
          </Typography>
          <Typography
            variant="body1"
            color={Colors.primaryTextColor}
            sx={{ letterSpacing: "0.5px" }}
            mb={2}
          >
            Promote and sell financial products effortlessly while earning real
            commissions online. Start your journey to financial success today!
          </Typography>
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              backgroundImage:
                "linear-gradient(90deg, #FF6A00 0%, #FFA726 100%)",
              color: Colors.white,
              "&:hover": {
                backgroundImage:
                  "linear-gradient(90deg, #E65C00 0%, #FF9800 100%)",
              },
            }}
            onClick={handleDownload}
          >
            Install Now
          </Button>
        </Box>
        <Box
          sx={{
            mt: { xs: 4, md: 0 },
            flexGrow: 1,
            flexBasis: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
          }}
        >
          <img
            src={heroProduct}
            alt="Hero Image"
            style={{
              width: "auto",
              maxWidth: "100%",
              maxHeight: "500px",
              height: "auto",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
