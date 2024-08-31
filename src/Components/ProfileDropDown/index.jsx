import { Menu, MenuItem, ListItem, Typography } from "@mui/material";
import ManualAvatar from "../Avatar/Avatar";

export default function ProfileMenu({ anchorEl, open, handleMenuClose, Data }) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      sx={{
        position: "absolute",
        top: "10px !important",
        right: "0px !important",
        zIndex: 1000,
      }}
    >
      <ListItem
        sx={{
          padding: "10px",
          gap: "5px",
        }}
      >
        <ManualAvatar
          src=""
          alt="Profile Picture"
          height="30px"
          width="30px"
          name={Data?.name}
        />
        <Typography fontSize={"16px"}>{Data?.name}</Typography>
      </ListItem>

      <MenuItem
        onClick={() => {
          handleMenuClose();
          localStorage.removeItem("Token");
          window.location.href = "/";
        }}
      >
        Log Out
      </MenuItem>
    </Menu>
  );
}
