import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import theme, { Colors } from "../../Theme/Theme";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../Assets/Images/networkLogo.png";
const SiteHeader = ({ scrollToTab, scrollToFooter }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const isMobileView = useMediaQuery("(max-width:900px)");
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const getMenuItemStyle = (path) => {
    return location.pathname === path
      ? {
          color: Colors.primaryTextColor,
          fontWeight: "600",
          textTransform: "capitalize",
          fontFamily: "Poppins, sans-serif",
        }
      : {
          color: Colors.secondaryColor,
          textTransform: "capitalize",
          fontFamily: "Poppins, sans-serif",
          fontWeight: "400",
        };
  };
  return (
    <Box sx={{ fontFamily: "Poppins, sans-serif" }}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #eff0f1",
          boxShadow: "none",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              px: { xs: 0 },
              minHeight: { xs: "60px", md: "60px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <img
                src={Logo}
                alt="Network Logo"
                height={isMediumScreen ? 28 : 40}
                width={isMediumScreen ? 28 : 40}
              />
              <Typography
                variant="h6"
                color={"#121212"}
                sx={{
                  cursor: "pointer",
                  fontWeight: "600",
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "normal",
                  lineHeight: 1.2,
                }}
              >
                PAY BILLS
              </Typography>
            </Box>

            {!isMobileView && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                  sx={getMenuItemStyle("/")}
                  onClick={() => navigate("/")}
                >
                  Home
                </Button>
                <Button
                  sx={getMenuItemStyle("#about")}
                  onClick={() => scrollToTab(0)}
                >
                  About Us
                </Button>
                <Button
                  sx={getMenuItemStyle("#footer")}
                  onClick={() => scrollToFooter()}
                >
                  Contact Us
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: Colors.primary,
                    color: Colors.primary,
                    "&:hover": {
                      borderColor: Colors.hoverColorBtn,
                    },
                    textTransform: "capitalize",
                  }}
                  onClick={() => navigate("/signin")}
                >
                  Sign in
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  href="https://www.pushbutton.in/auth/role"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundImage:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff",
                    textTransform: "capitalize",
                    fontWeight: 600,
                    px: 2.5,
                    borderRadius: "20px",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(135deg, #5a6fd6 0%, #6a4299 100%)",
                      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  Insurance Login
                </Button>
              </Box>
            )}

            {isMobileView && (
              <Box>
                <IconButton
                  size="large"
                  onClick={handleOpenNavMenu}
                  color={Colors.primaryTextColor}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  <MenuItem
                    sx={getMenuItemStyle("/")}
                    onClick={() => {
                      navigate("/");
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography>Home</Typography>
                  </MenuItem>
                  <MenuItem
                    sx={getMenuItemStyle("#about")}
                    onClick={() => {
                      handleCloseNavMenu();
                      scrollToTab(0);
                    }}
                  >
                    <Typography>About Us</Typography>
                  </MenuItem>
                  <MenuItem
                    sx={getMenuItemStyle("/contact-us")}
                    onClick={() => {
                      handleCloseNavMenu();
                      scrollToFooter();
                    }}
                  >
                    <Typography>Contact Us</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/signin");
                      handleCloseNavMenu();
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: Colors.primary,
                        color: Colors.primary,
                        "&:hover": {
                          borderColor: Colors.hoverColorBtn,
                        },
                        textTransform: "capitalize",
                      }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      href="https://www.pushbutton.in/auth/role"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        backgroundImage:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "#fff",
                        textTransform: "capitalize",
                        fontWeight: 600,
                        borderRadius: "20px",
                        boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                        "&:hover": {
                          backgroundImage:
                            "linear-gradient(135deg, #5a6fd6 0%, #6a4299 100%)",
                          boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                        },
                      }}
                    >
                      Insurance Login
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default SiteHeader;
