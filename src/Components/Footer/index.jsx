import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Grid,
} from "@mui/material";
import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logo from "../../Assets/Images/networkLogo.png";
import { Colors } from "../../Theme/Theme";
const Footer = ({ scrollToTab, footerRef }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#111827",
        color: Colors.white,
        py: { xs: 4, md: 8 },
        pb: { xs: 2, md: 2 },
      }}
      ref={footerRef}
    >
      <Container sx={{ px: { xs: 2 } }}>
        <Grid container spacing={2} sx={{ m: 0 }}>
          <Grid xs={12} md={4} textAlign={"left"}>
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{
                width: "100px",
                maxWidth: "120px",
                mb: 2,
              }}
            />
            <Typography
              variant="body2"
              color="inherit"
              sx={{ width: "-webkit-fill-available" }}
            >
              Join 1,000+ earners making money by selling financial products.
              Start today and earn up to ₹1 Lakh/month!
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                sx={{ color: Colors.white }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener"
                sx={{ color: Colors.white }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                sx={{ color: Colors.white }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
                sx={{ color: Colors.white }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid xs={12} md={4} textAlign={"left"}>
            <Typography
              variant="h6"
              color="inherit"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Products
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                cursor: "pointer",
              }}
              onClick={() => scrollToTab(0)}
            >
              <Typography variant="body2" color="inherit">
                Credit Card
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                cursor: "pointer",
              }}
              onClick={() => scrollToTab(1)}
            >
              <Typography variant="body2" color="inherit">
                Savings Account
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                cursor: "pointer",
              }}
            >
              <Typography
                variant="body2"
                color="inherit"
                onClick={() => scrollToTab(2)}
              >
                Loan
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                cursor: "pointer",
              }}
              onClick={() => scrollToTab(3)}
            >
              <Typography variant="body2" color="inherit">
                Investment
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                cursor: "pointer",
              }}
              onClick={() => scrollToTab(4)}
            >
              <Typography variant="body2" color="inherit">
                Insurance
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                cursor: "pointer",
              }}
              onClick={() => scrollToTab(5)}
            >
              <Typography variant="body2" color="inherit">
                Refer & Earn
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                cursor: "pointer",
              }}
              onClick={() => scrollToTab(6)}
            >
              <Typography variant="body2" color="inherit">
                AEPS
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                cursor: "pointer",
              }}
              onClick={() => scrollToTab(7)}
            >
              <Typography variant="body2" color="inherit">
                Affiliate Marketing
              </Typography>
            </Box>
          </Grid>

          <Grid xs={12} md={4} textAlign={"left"}>
  <Typography
    variant="h6"
    color="inherit"
    sx={{ fontWeight: 600, mb: 2 }}
  >
    Contact Us
  </Typography>

  {/* Phone */}
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <PhoneIcon sx={{ mr: 2 }} />
    <Typography variant="body2" color="inherit">
      +91 8367633803
    </Typography>
  </Box>

  {/* Email */}
  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
    <EmailIcon sx={{ mr: 2 }} />
    <Typography variant="body2" color="inherit">
      <Link
        href="mailto:support@fipaybills.com"
        color="inherit"
        underline="hover"
      >
        support@fipaybills.com
      </Link>
    </Typography>
  </Box>
</Grid>

        </Grid>

        <Box
          sx={{
            textAlign: "center",
            mt: { xs: 4, md: 4 },
            pt: 2,
            borderTop: `1px solid #f5f5f5`,
          }}
        >
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Fi. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
