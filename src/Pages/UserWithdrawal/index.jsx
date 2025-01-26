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

export default function UserWithdrawal({ setActiveSideBar }) {
  const [wallettData, setWallettData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const getWithdrawals = async () => {
    try {
      const data = await hub.getWithdrawals();
      setWallettData(data.data);
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  useEffect(() => {
    getWithdrawals();
  }, [selectedItem]);
  // useEffect(() => {
  // }, [selectedItem]);

  const handleSave = async () => {
    if (selectedItem) {
      try {
        await hub.patchWithdrawalStatusUpdate({
          status: "APPROVED",
          withdrawalId: selectedItem.id,
        });
        alert("Approved successfully!");

        setSelectedItem(null);
      } catch (error) {
        alert("Failed to update quota");
      }
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    // setSelectedLevel(1); // Default to Level 1
    setInputValue(item.id); // Set the input to Level 1 quota by default
  };
  return (
    <Box
      marginLeft={{
        md: `${SideBarWidth}px`,
      }}
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
          bgcolor={"#ffffff"}
          mb={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 1,
            padding: {
              xs: "12px 16px 12px 16px",
              sm: "16px 20px 16px 20px",
            },
          }}
        >
          {selectedItem?.user_email && (
            <>
              <Typography
                variant="h6"
                sx={{
                  color: Colors.primaryTextColor,
                  fontWeight: "700",
                  marginBottom: "16px",
                  textAlign: "left",
                  mb: 1.5,
                }}
              >
                {selectedItem?.user_email}
              </Typography>
            </>
          )}
          <Typography
            sx={{
              fontSize: "12px",
              color: "red",
              fontWeight: "400",
              textAlign: "left",
              letterSpacing: 1,
              mb: 1,
            }}
          >
            Please Review It Carefully before Approving It
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 0 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: Colors.primary,
                color: Colors.white,
                "&:hover": {
                  backgroundColor: Colors.hoverColorBtn,
                },
              }}
              onClick={handleSave}
              disabled={!selectedItem}
            >
              APPROVE
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: {
              xs: "12px 16px 12px 16px",
              sm: "16px 20px 16px 20px",
            },
            borderRadius: "8px",
            height: { xs: "max-content", md: "auto" },
            mt: 3,
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
              User Withdrawal
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
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wallettData?.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      "&:last-child td": { borderBottom: "none" }, // Removes bottom border for the last row
                    }}
                  >
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
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      <IconButton
                        onClick={() => handleEdit(item)}
                        sx={{ bgcolor: Colors.BgColorLite }}
                      >
                        <ModeEditOutlineOutlinedIcon
                          sx={{ color: Colors.primary }}
                        />
                      </IconButton>
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
