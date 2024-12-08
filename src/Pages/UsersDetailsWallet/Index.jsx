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
      console.log(amount, selectedId, numericAmount, "amount,selectedId");
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
        console.log(error);
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
          bgcolor={"#242424"}
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
                color: "#F2F2F7",
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
                  color: "#F2F2F7",
                  "& fieldset": {
                    borderColor: "#6f6f6f",
                    color: "#F2F2F7",
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
                color: "#F2F2F7",
                borderRadius: "4px",
              }}
              disabled={!selectedItem}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                height: "max-content",
                "&.Mui-disabled": {
                  bgcolor: "#d3d3d3",
                  color: "#9e9e9e",
                  boxShadow: "none",
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
                  color: "#F2F2F7",
                  "& fieldset": {
                    borderColor: "#6f6f6f",
                    color: "#F2F2F7",
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
                color: "#F2F2F7",
                borderRadius: "4px",
              }}
              disabled={!selectedItem}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                minWidth:'max-content',
                height: "max-content",
                "&.Mui-disabled": {
                  bgcolor: "#d3d3d3",
                  color: "#9e9e9e",
                  boxShadow: "none",
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
            backgroundColor: "#2C2C2E",
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
          <Typography
            sx={{
              fontSize: "18px",
              color: "#F2F2F7",
              fontWeight: "500",
              textAlign: "left",
              mb: 2,
            }}
          >
            Users Wallet History
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ bgcolor: "#262626" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#F2F2F7" }}>Name</TableCell>
                  <TableCell sx={{ color: "#F2F2F7" }}>Email</TableCell>
                  <TableCell sx={{ color: "#F2F2F7" }}>Level</TableCell>
                  <TableCell sx={{ color: "#F2F2F7" }}>Hub</TableCell>
                  <TableCell sx={{ color: "#F2F2F7" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((item) => (
                  <React.Fragment key={item.user.id}>
                    <TableRow
                      onClick={() => handleRowClick(item.user.id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell sx={{ color: "#F2F2F7" }}>
                        {item.user.name}
                      </TableCell>
                      <TableCell sx={{ color: "#F2F2F7" }}>
                        {item.user.emailId}
                      </TableCell>
                      <TableCell sx={{ color: "#F2F2F7" }}>
                        {item.level}
                      </TableCell>
                      <TableCell sx={{ color: "#F2F2F7" }}>
                        {item.hubName}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(item);
                          }}
                          sx={{ bgcolor: "#2f2f2f" }}
                        >
                          <ModeEditOutlineOutlinedIcon
                            sx={{ color: "#F2F2F7" }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5} sx={{ padding: 0 }}>
                        <Collapse in={expandedRow === item.user.id}>
                          <Box sx={{ padding: 2 }}>
                            <Table
                              size="small"
                              sx={{ backgroundColor: "#333" }}
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell sx={{ color: "#F2F2F7" }}>
                                    Transaction ID
                                  </TableCell>
                                  <TableCell sx={{ color: "#F2F2F7" }}>
                                    Amount
                                  </TableCell>
                                  <TableCell sx={{ color: "#F2F2F7" }}>
                                    Type
                                  </TableCell>
                                  <TableCell sx={{ color: "#F2F2F7" }}>
                                    Timestamp
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {item.walletHistory.map((historyItem) => (
                                  <TableRow key={historyItem.id}>
                                    <TableCell sx={{ color: "#F2F2F7" }}>
                                      {historyItem.id}
                                    </TableCell>
                                    <TableCell sx={{ color: "#F2F2F7" }}>
                                      {historyItem.amount}
                                    </TableCell>
                                    <TableCell sx={{ color: "#F2F2F7" }}>
                                      {historyItem.type}
                                    </TableCell>
                                    <TableCell sx={{ color: "#F2F2F7" }}>
                                      {new Date(
                                        historyItem.timestamp
                                      ).toLocaleString()}
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
