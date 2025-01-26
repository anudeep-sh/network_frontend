import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SideBarItem from "../../Components/SideBarItem";
import { sideBarBottomItems, SideBarItems } from "../../utils/SideBarMenuItems";
import { useLocation } from "react-router-dom";
import { AdminSideBarMenuItems } from "../../utils/AdminSideBarMenuItems";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Drawer from "@mui/material/Drawer";
import LogoUrl from "../../Assets/Images/networkLogo.png";
import { Colors } from "../../Theme/Theme";

const drawerWidth = 240;

export default function SideBar({
  activeSideBar,
  setActiveSideBar,
  handleDrawerToggle,
  mobileOpen,
}) {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { pathname } = useLocation();
  const Admin = localStorage.getItem("Role") === "ADMIN";
  const drawer = (
    <div style={{ height: "100dvh" }}>
      <Toolbar sx={{ minHeight: { xs: "56px", sm: "60px" },px:'20px!important' }}>
        <img
          src={LogoUrl}
          alt="Network Logo"
          height={isMediumScreen ? 25 : 42}
          width={isMediumScreen ? 25 : 42}
          // style={{ marginLeft: isMediumScreen ? "5px" : "24px" }}
        />
      </Toolbar>
      <Divider sx={{borderColor:Colors.dividerColor}}/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "92%!important",
        }}
      >
        <List
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
                url={item?.path}
                active={pathname === item.path}
              />
            );
          })}
          {Admin && (
            <>
              {AdminSideBarMenuItems.map((item, index) => {
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
            </>
          )}
        </List>
        <List>
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
        </List>
      </Box>
    </div>
  );
  return (
    <>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { md: 0 },
          backgroundColor: "#FAFAFA",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: Colors.white,
              overflowY: "hidden",
              borderColor:Colors.dividerColor
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor:Colors.white,
              overflowY: "hidden",
              borderColor:Colors.dividerColor
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
