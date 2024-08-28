import {
  Box,
  IconButton,
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

export default function Navbar({ activeSideBar, setActiveSideBar }) {
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
    <Box
      sx={{
        backgroundColor: "#242426",
        height: "60px",
        maxHeight: "60px",
        display: "flex",
        alignItems: "center",
        position: "sticky",
        width: "100%",
        zIndex: 1000,
        top: 0,
      }}
    >
      {isMediumScreen && (
        <>
          {activeSideBar ? (
            <Close
              onClick={() => setActiveSideBar(!activeSideBar)}
              sx={{
                color: "#0372c1",
                fontSize: "30px",
                marginLeft: "20px",
                cursor: "pointer",
              }}
            />
          ) : (
            <Menu
              onClick={() => setActiveSideBar(!activeSideBar)}
              sx={{
                color: "#0372c1",
                fontSize: "30px",
                marginLeft: "20px",
                cursor: "pointer",
              }}
            />
          )}
        </>
      )}
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={"5px"}
        sx={{
          cursor: "pointer",
        }}
        onClick={() => activeSideBar && setActiveSideBar(false)}
      >
        <img
          src={LogoUrl}
          alt="Network Logo"
          height={isMediumScreen ? 25 : 40}
          width={isMediumScreen ? 25 : 40}
          style={{
            marginLeft: isMediumScreen ? "5px" : "20px",
          }}
        />
        <Typography
          fontSize={isMediumScreen ? "20px" : "24px"}
          color={"#0372c1"}
        >
          Network
        </Typography>
      </Box>
      <Box
        display={"flex"}
        marginLeft={"auto"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        padding={"16px 20px"}
        gap={"8px"}
        width={"200px"}
      >
        <ManualAvatar
          src={Data.src}
          alt={Data.alt}
          name={Data?.name}
          width={"30px"}
          height={"30px"}
          onClick={handleMenuOpen}
          sx={{ cursor: "pointer" }}
        />
        <Typography
          fontSize={"12px"}
          letterSpacing={"1%"}
          textAlign={"start"}
          fontWeight={"400"}
          lineHeight={"14px"}
          color={"#F2F2F7"}
          sx={{ cursor: "pointer" }}
        >
          {Data?.name}
        </Typography>
        <IconButton
          onClick={handleMenuOpen}
          sx={{
            padding: "0px",
          }}
        >
          {menuOpen ? (
            <ArrowDropUp sx={{ color: "#FFFFFF" }} />
          ) : (
            <ArrowDropDown sx={{ color: "#FFFFFF" }} />
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
    </Box>
  );
}
