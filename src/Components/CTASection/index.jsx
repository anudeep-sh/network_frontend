import { Box, Button, Container, Typography } from "@mui/material";
import { Colors } from "../../Theme/Theme";
import AppImage from "../../Assets/Images/hero/productImg2.png";

const CTASection = () => {
  const handleDownload = () => {
    window.open(
      "https://drive.google.com/file/d/1rYqpMt9HtshOU9Qeo87OKdx9zen32Vty/view",
      "_blank"
    );
  };
  return (
    <Box sx={{ backgroundColor: "#FFFAF0" }}>
      <Container sx={{ py: 5, px: { xs: 2 } }}>
        <Box
          sx={{
            background: "linear-gradient(90deg, #E65D00, #FFA810)",
            borderRadius: "16px",
            overflow: "hidden",
            py: { xs: 4, md: 6 },
            px: { xs: 3, md: 5 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            color: Colors.secondary,
            textAlign: { xs: "left", md: "left" },
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Boost Your Income with <br />
              <Box component="span" sx={{ color: "#CDEA68" }}>
                Minimal Investment
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Join 1,000+ earners selling financial products & make up to ₹1
              Lakh/month!
            </Typography>

            <Button
              sx={{
                backgroundColor: "#000",
                borderRadius: "8px",
                px: 2,
                py: 1,
                color: "#fff",
                "&:hover": { backgroundColor: "#333" },
              }}
              onClick={handleDownload}
            >
              Download Now
            </Button>
          </Box>

          <Box
            component="img"
            src={AppImage}
            alt="App Screenshot"
            sx={{
              width: { xs: "100%", md: "40%" },
              maxWidth: "350px",
              maxHeight: "250px",
              objectFit: "contain",
              mt: { xs: 4, md: 0 },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;
