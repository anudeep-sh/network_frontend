import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ManualAvatar from "../../Components/Avatar/Avatar";
import LogoUrl from "../../Assets/Images/networkLogo.png";
import { ArrowDropDown, ArrowDropUp, Close, Menu } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ProfileMenu from "../../Components/ProfileDropDown";
import GetValidatedTokenData from "../../utils/helper";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar({ handleDrawerToggle, mobileOpen }) {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [Data, setData] = useState({
    name: "John Doe",
    src: "",
    alt: "Profile Picture",
  });

  useEffect(() => {
    const response = GetValidatedTokenData();
    console.log(response.userPayload);
    setData({
      name: response.userPayload?.name.toUpperCase(),
      src: "",
      alt: "Profile Picture",
    });
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#fff",
          borderTop: "1px solid #e3e3e3",
          borderBottom: "1px solid #FE2E1F",
          height: "60px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMediumScreen && (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ color: "#FE2E1F", fontSize: "30px", ml: "20px" }}
              >
                {mobileOpen ? <Close /> : <Menu />}
              </IconButton>
            )}
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"5px"}
              sx={{ cursor: "pointer" }}
            >
              <img
                src={LogoUrl}
                alt="Network Logo"
                height={isMediumScreen ? 25 : 42}
                width={isMediumScreen ? 25 : 42}
                style={{ marginLeft: isMediumScreen ? "5px" : "24px" }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "200px",
              padding: "16px 20px",
              gap: "8px",
            }}
          >
            <ManualAvatar
              src={Data.src}
              alt={Data.alt}
              name={Data?.name}
              width={"30px"}
              height={"30px"}
              onClick={handleMenuOpen}
              sx={{ cursor: "pointer", bgcolor: "red" }}
            />
            <Typography
              fontSize={"12px"}
              letterSpacing={"1%"}
              textAlign={"start"}
              fontWeight={"400"}
              lineHeight={"14px"}
              color={"#F47F34"}
              sx={{ cursor: "pointer" }}
            >
              {Data?.name}
            </Typography>
            <IconButton onClick={handleMenuOpen} sx={{ padding: "0px" }}>
              {menuOpen ? (
                <ArrowDropUp sx={{ color: "#F47F34" }} />
              ) : (
                <ArrowDropDown sx={{ color: "#F47F34" }} />
              )}
            </IconButton>
            {menuOpen && (
              <ProfileMenu
                anchorEl={anchorEl}
                open={menuOpen}
                handleMenuClose={handleMenuClose}
                Data={Data}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}