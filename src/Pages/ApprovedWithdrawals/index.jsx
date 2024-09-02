import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { SideBarWidth } from "../../utils/SideBarWidth";
import { hub } from "../../api/requests/hubs/hubs";
import { useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

export default function ApprovedWithdrawals({ setActiveSideBar }) {
  const [wallettData, setWallettData] = useState([]);

  const getPendingUserWithdrawals = async () => {
    try {
      const data = await hub.getApprovedWithdrawals();
      console.log(data, "data");
      setWallettData(data.data);
    } catch (error) {
      alert(error?.response?.data);
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getPendingUserWithdrawals();
  }, []);

  return (
    <Box
      marginLeft={{
        md: `${SideBarWidth}px`,
      }}
      // onClick={() => {
      //   setActiveSideBar(false);
      // }}
      sx={{
        width: {
          xs: "100%",
          md: `calc(100% - ${SideBarWidth}px)`,
        },
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
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            backgroundColor: "#2C2C2E",
            padding: {
              xs: "12px 16px 12px 16px",
              sm: "16px 20px 16px 20px",
            },
            borderRadius: "8px",
            height: { xs: "max-content", md: "auto" },
            width: { xs: "-webkit-fill-available" },
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              color: "#F2F2F7",
              fontWeight: "500",
              textAlign: "left",
              mb: 2,
            }}
          >
           Approved Withdrawals
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ bgcolor: "#262626" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#F2F2F7" }}>Name</TableCell>
                  <TableCell sx={{ color: "#F2F2F7" }}>Email</TableCell>
                  <TableCell sx={{ color: "#F2F2F7" }}>Shortcode</TableCell>
                  <TableCell sx={{ color: "#F2F2F7" }}>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wallettData?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ color: "#F2F2F7" }}>
                      {item.user_name}
                    </TableCell>
                    <TableCell sx={{ color: "#F2F2F7" }}>
                      {item.user_email}
                    </TableCell>
                    <TableCell sx={{ color: "#F2F2F7" }}>
                      {item.user_shortcode}
                    </TableCell>
                    <TableCell sx={{ color: "#F2F2F7" }}>
                      {item.amount}
                    </TableCell>
                   
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
