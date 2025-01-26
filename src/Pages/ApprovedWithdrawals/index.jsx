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
import { Colors } from "../../Theme/Theme";

export default function ApprovedWithdrawals({ setActiveSideBar }) {
  const [wallettData, setWallettData] = useState([]);

  const getPendingUserWithdrawals = async () => {
    try {
      const data = await hub.getApprovedWithdrawals();
      setWallettData(data.data);
    } catch (error) {
      alert(error?.response?.data);
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
            backgroundColor: "#ffffff",
            padding: {
              xs: "12px 16px 12px 16px",
              sm: "16px 20px 16px 20px",
            },
            borderRadius: "8px",
            height: { xs: "max-content", md: "auto" },
            width: { xs: "-webkit-fill-available" },
          }}
        >
          <TableContainer
            sx={{
              backgroundColor: Colors.white,
              border: `1px solid ${Colors.dividerColor}`,
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: Colors.primaryTextColor,
                fontWeight: "700",
                marginBottom: "16px",
                textAlign: "left",
                mt: 2,
                ml: 2,
              }}
            >
              Approved Withdrawals
            </Typography>
            <Table sx={{ borderTop: `1px solid ${Colors.tableHeaderBorder}` }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Shortcode
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Pan number
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Aadhar number
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Bank account number
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Ifsc code
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Upi linkedin number
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wallettData?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                        minWidth: "160px",
                      }}
                    >
                      {item.user_name}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      {item.user_email}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      {item.user_shortcode}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      {item.amount}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      {item.status}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                        minWidth: "160px",
                      }}
                    >
                      {item.pan_number}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                        minWidth: "160px",
                      }}
                    >
                      {item.aadhar_number}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                        minWidth: "160px",
                      }}
                    >
                      {item.bank_account_number}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                        minWidth: "160px",
                      }}
                    >
                      {item.ifsc_code}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                        minWidth: "160px",
                      }}
                    >
                      {item.upi_linkedin_number}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                        minWidth: "170px",
                      }}
                    >
                      {new Date(item.timestamp).toLocaleString()}
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
