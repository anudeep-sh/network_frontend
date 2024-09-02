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
      <Toolbar sx={{ minHeight: { xs: '56px', sm: '60px' } }} />
      <Divider />
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
          flexShrink: { sm: 0 },
          backgroundColor: "#242426",
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#242426",
              overflowY: "hidden",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#242426",
              overflowY: "hidden",
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
