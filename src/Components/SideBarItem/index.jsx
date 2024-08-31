import {
  Box,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SideBarItem({
  Icon,
  title,
  active,
  index,
  onClick,
  menuList = [],
  activeSideBar,
  setActiveSideBar,
  url,
  key,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (onClick) {
      onClick();
    }
    navigate(url);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem key={key} disablePadding>
        <ListItemButton
          sx={{
            padding: "8px 20px",
            marginBottom: "4px",
            gap:'12px',
            backgroundColor: active ? "#181818" : "transparent",
            "&:hover": {
              backgroundColor: "#181818",
              cursor: "pointer",
              "& .MuiTypography-root, & .MuiIconButton-root": {
                color: "#F7F7F7",
              },
              "& .MuiSvgIcon-root": {
                color: "#F7F7F7",
              },
            },
          }}
          onClick={handleNavigation}
          // onClick={menuList.length > 0 ? handleToggle : onClick}
        >
          <ListItemIcon sx={{ minWidth: '20px', height: '24px',}}   color={active ? "#F7F7F7" : "#9898A1"}>
            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            <span style={{color:active ? "#F7F7F7" : "#9898A1"}}>{Icon}</span>
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                display="flex"
                alignItems="center"
                color={active ? "#F7F7F7" : "#9898A1"}
                lineHeight="20px"
                gap="12px"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              >
                {/* {Icon} */}
                {title}
              </Typography>
            }
          />
          {menuList.length > 0 && (
            <IconButton
              onClick={handleToggle}
              sx={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
                backgroundColor: "transparent",
                color: "#646c78",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "transparent",
                },
                padding: 0,
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          )}
        </ListItemButton>

        {menuList.length > 0 && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuList.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    color: "#646c78",
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  <ListItemIcon>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#646c78",
                        "&:hover": {
                          backgroundColor: "#fff",
                        },
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </ListItem>

      {/* <Box
      padding={"8px 20px"}
      marginBottom={"4px"}
      sx={{
        backgroundColor: active ? "#181818" : "transparent",
        "&:hover": {
          backgroundColor: "#181818",
          cursor: "pointer",
          "& > div > .MuiTypography-root, & > div > .MuiIconButton-root": {
            color: "##F7F7F7",
          },
          "& .MuiSvgIcon-root": {
            color: "##F7F7F7",
          },
        },
      }}
    >
      <Link to={url} style={{ textDecoration: "none" }}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
          onClick={menuList.length > 0 ? handleToggle : onClick}
        >
          <Typography
            display={"flex"}
            alignItems={"center"}
            color={active ? "#F7F7F7" : "#9898A1"}
            lineHeight={"20px"}
            gap={"12px"}
            onClick={() => {
              // setActiveSideBar(!activeSideBar);
            }}
          >
            {Icon}
            <span
              style={{
                margin: 0,
                padding: 0,
                fontFamily: "Poppins, sans-serif",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              {title}
            </span>
          </Typography>
          {menuList.length > 0 && (
            <IconButton
              onClick={handleToggle}
              sx={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
                backgroundColor: "transparent",
                color: "#646c78",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "transparent",
                },
                padding: 0,
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          )}
        </Box>
      </Link>
      {menuList.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menuList.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  color: "#646c78",
                  "&:hover": {
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#646c78",
                      "&:hover": {
                        backgroundColor: "#fff",
                      },
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </Box> */}
    </>
  );
}
