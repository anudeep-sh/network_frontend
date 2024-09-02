import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import SideBarItem from "../../Components/SideBarItem";
import { sideBarBottomItems, SideBarItems } from "../../utils/SideBarMenuItems";
import { useLocation } from "react-router-dom";

export default function SideBar({ activeSideBar, setActiveSideBar }) {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { pathname } = useLocation();

  return (
    <Box
      maxWidth={"240px"}
      width={"240px"}
      //height should be caluclate for full screen - height of navbar
      height={"calc(100vh - 60px)"}
      position={"absolute"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      // top={"0px"}
      //   top={isMediumScreen ? "10px" : ''}
      marginTop={"1px"}
      left={"0px"}
      zIndex={900}
      sx={{
        backgroundColor: "#242426",
        overflowY: "hidden",
        transition: activeSideBar && "width 0.3s ease-in-out",
      }}
    >
      <Box
        height={"70%"}
        marginTop={"15px"}
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2a2a3c",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#1e1e2d",
          },
        }}
      >
        {SideBarItems.map((item, index) => {
          return (
            <SideBarItem
              key={index}
              index={index}
              Icon={item.Icon}
              title={item.title}
              menuList={item.menuList}
              onClick={item.onClick}
              activeSideBar={activeSideBar}
              setActiveSideBar={setActiveSideBar}
              url={item.path}
              active={pathname === item.path}
            />
          );
        })}
      </Box>
      <Box marginBottom={"10px"}>
        {sideBarBottomItems.map((item, index) => (
          <SideBarItem
            key={index}
            index={index}
            Icon={item.Icon}
            title={item.title}
            menuList={item.menuList}
            onClick={item.onClick}
            activeSideBar={activeSideBar}
            setActiveSideBar={setActiveSideBar}
            url={item.path}
          />
        ))}
      </Box>
    </Box>
  );
}
