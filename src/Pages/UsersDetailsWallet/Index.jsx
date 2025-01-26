import {
  Box,
  TextField,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Collapse,
  TableFooter,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SideBarWidth } from "../../utils/SideBarWidth";
import { hub } from "../../api/requests/hubs/hubs";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Colors } from "../../Theme/Theme";

const UsersDetailsWallet = ({ setActiveSideBar }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [passwordValue, setPasswordValue] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  const getUsersWallet = async () => {
    try {
      const response = await hub.getUsersWallet();
      setData(response?.users || []);
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  useEffect(() => {
    getUsersWallet();
  }, []);

  const handleInputChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const handleInputChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleSave = async () => {
    if (selectedItem) {
      try {
        const response = await hub.patchUpdateUserPassword(selectedId, {
          newPassword: passwordValue,
        });
        if (response) {
          setSelectedItem(null);
          setPasswordValue("");
          alert("Updated Password Successfully!");
        }
      } catch (error) {
        alert("Failed To Update Password");
      }
    } else {
      alert("Please select a user and enter a password before saving.");
    }
  };
  const handleAddAmount = async () => {
    if (selectedItem) {
      const numericAmount = Number(amount);
      try {
        const response = await hub.patchUpdateWalletDetails({
          amount: numericAmount,
          user_id: selectedId,
        });
        if (response) {
          setSelectedItem(null);
          setAmount("");
          getUsersWallet();
          alert(" Added Amount Successfully!");
        }
      } catch (error) {
        alert("Failed To Add Amount");
      }
    } else {
      alert("Please select a user and enter a password before saving.");
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setSelectedId(item?.user?.id);
  };

  const handleRowClick = (itemId) => {
    setExpandedRow(expandedRow === itemId ? null : itemId);
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
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 1,
            padding: {
              xs: "12px 16px",
              sm: "16px 20px",
            },
            gap: 3,
          }}
        >
          {selectedItem?.name && (
            <Typography
              sx={{
                fontSize: "18px",
                color: "#3C3C3C",
                fontWeight: "500",
                textAlign: "left",
                mb: 2,
              }}
            >
              {selectedItem?.name}
            </Typography>
          )}

          <Box sx={{ display: "flex", gap: 2, mb: 0 }}>
            <TextField
              variant="outlined"
              size="small"
              type="number"
              label="Select User Change Password"
              value={passwordValue}
              onChange={handleInputChange}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#6f6f6f",
                },
                "& .MuiOutlinedInput-root": {
                  color: "#3C3C3C",
                  "& fieldset": {
                    borderColor: "#3C3C3C",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3C3C3C",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3C3C3C",
                  },
                },
                "&.Mui-disabled": {
                  "& fieldset": {
                    borderColor: "#393939",
                  },

                  backgroundColor: "#e0e0e0",
                },
                width: "300px",
                color: "#3C3C3C",
                borderRadius: "4px",
              }}
              disabled={!selectedItem}
            />
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
              Save
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 0 }}>
            <TextField
              variant="outlined"
              size="small"
              type="number"
              label="Select User & Add Amount"
              value={amount}
              onChange={handleInputChangeAmount}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#6f6f6f",
                },
                "& .MuiOutlinedInput-root": {
                  color: "#3C3C3C",
                  "& fieldset": {
                    borderColor: "#6f6f6f",
                    color: "#3C3C3C",
                  },
                  "&:hover fieldset": {
                    borderColor: "#6f6f6f",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6f6f6f",
                  },
                },
                "&.Mui-disabled": {
                  "& fieldset": {
                    borderColor: "#393939",
                  },

                  backgroundColor: "#e0e0e0",
                },
                width: "300px",
                color: "#3C3C3C",
                borderRadius: "4px",
              }}
              disabled={!selectedItem}
            />
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
              onClick={handleAddAmount}
              disabled={!selectedItem}
            >
              Add Amount
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: {
              xs: "12px 16px",
              sm: "16px 20px",
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
    overflowX: "auto", 
    overflowY: "hidden",
    width: "100%", 
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
    Users Wallet History
  </Typography>
  <Table sx={{ borderCollapse: "separate" }}>
    <TableHead>
      <TableRow>
        {["Name", "Email", "Shortcode", "Level", "Hub", "Actions"].map(
          (header) => (
            <TableCell
              key={header}
              sx={{
                color: Colors.primaryTextColor,
                py: 1,
                px: 2,
                fontWeight: "600",
                letterSpacing: "0.5px",
                bgcolor: "#F9FBFC",
                borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
              }}
            >
              {header}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
    <TableBody>
      {data?.map((item) => (
        <React.Fragment key={item.user.id}>
          <TableRow
            onClick={() => handleRowClick(item.user.id)}
            sx={{
              cursor: "pointer",
              border:'none',
              "&:hover": { backgroundColor: "#F5F5F5" },
            }}
          >
            <TableCell sx={{ color: Colors.primaryTextColor, borderBottom: `1px solid ${Colors.dividerColor}` }}>
              {item.user.name}
            </TableCell>
            <TableCell sx={{ color: Colors.primaryTextColor, borderBottom: `1px solid ${Colors.dividerColor}` }}>
              {item.user.emailId}
            </TableCell>
            <TableCell sx={{ color: Colors.primaryTextColor, borderBottom: `1px solid ${Colors.dividerColor}` }}>
              {item.user.shortcode}
            </TableCell>
            <TableCell sx={{ color: Colors.primaryTextColor, borderBottom: `1px solid ${Colors.dividerColor}` }}>
              {item.level}
            </TableCell>
            <TableCell sx={{ color: Colors.primaryTextColor, borderBottom: `1px solid ${Colors.dividerColor}` }}>
              {item.hubName}
            </TableCell>
            <TableCell sx={{ color: Colors.primaryTextColor, borderBottom: `1px solid ${Colors.dividerColor}` }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(item);
                }}
                sx={{ bgcolor: Colors.BgColorLite }}
              >
                <ModeEditOutlineOutlinedIcon sx={{ color: Colors.primary }} />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell colSpan={6} sx={{padding: 0,borderBottom:expandedRow === item.user.id?`1px solid ${Colors.dividerColor}`:'none'}}>
              <Collapse in={expandedRow === item.user.id}>
                <Box sx={{ padding: 2, backgroundColor: "#F9FBFC", borderRadius: "8px" }}>
                  <Table
                    size="small"
                    sx={{
                      border: `1px solid ${Colors.tableHeaderBorder}`,
                      borderRadius: "8px",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        {["Transaction ID", "Amount", "Type", "Date"]?.map((subHeader) => (
                          <TableCell
                            key={subHeader}
                            sx={{
                              color: "#3C3C3C",
                              py: 1,
                              px: 2,
                              fontWeight: "600",
                              borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                            }}
                          >
                            {subHeader}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item?.walletHistory?.map((historyItem) => (
                        <TableRow key={historyItem.id}>
                          <TableCell sx={{ color: "#3C3C3C", borderBottom: "1px solid #E0E0E0" }}>
                            {historyItem.id}
                          </TableCell>
                          <TableCell sx={{ color: "#3C3C3C", borderBottom: "1px solid #E0E0E0" }}>
                            {historyItem.amount}
                          </TableCell>
                          <TableCell sx={{ color: "#3C3C3C", borderBottom: "1px solid #E0E0E0" }}>
                            {historyItem.type}
                          </TableCell>
                          <TableCell sx={{ color: "#3C3C3C", borderBottom: "1px solid #E0E0E0" }}>
                            {new Date(historyItem.timestamp).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ))}
    </TableBody>
  </Table>
</TableContainer>

        </Box>
      </Box>
    </Box>
  );
};

export default UsersDetailsWallet;
