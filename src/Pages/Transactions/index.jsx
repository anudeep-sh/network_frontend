import { Box } from "@mui/material";
import { SideBarWidth } from "../../utils/SideBarWidth";

export default function Transactions() {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: `calc(100% - ${SideBarWidth}px)` },
        ml: { md: `${SideBarWidth}px` },
      }}
      height={"100vh"}
    >
      Add Member
    </Box>
  );
}
