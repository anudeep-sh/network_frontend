// import {
//   Box,
//   TextField,
//   Typography,
//   Button,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { SideBarWidth } from "../../utils/SideBarWidth";
// import { hub } from "../../api/requests/hubs/hubs";
// import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

// const UsersDetailsWallet = ({ setActiveSideBar }) => {
//   const [selectedItem, setSelectedItem] = useState();
//   const [passwordValue, setPasswordValue] = useState();
//   const [data, setData] = useState();

//   const getUsersWallet = async () => {
//     try {
//       const data = await hub.getUsersWallet();
//       console.log(data, "data");
//       setData(data?.users);
//     } catch (error) {
//       alert(error?.response?.data);
//       console.log(error, "error");
//     }
//   };
//   useEffect(() => {
//     getUsersWallet();
//   }, []);

//   const handleInputChange = () => {};
//   const handleSave = () => {
//     // api call
//   };
//   const handleEdit = (item) => {
//     setSelectedItem(item);
//   };
//   console.log(selectedItem, "selectedItem");
//   return (
//     <>
//       <Box
//         marginLeft={{
//           md: `${SideBarWidth}px`,
//         }}
//         onClick={() => {
//           setActiveSideBar(false);
//         }}
//         sx={{
//           width: {
//             xs: "100%",
//             md: `calc(100% - ${SideBarWidth}px)`,
//           },
//           overflowY: "auto",
//           "&::-webkit-scrollbar": {
//             width: "0px",
//           },
//           "&::-webkit-scrollbar-thumb": {
//             backgroundColor: "#2a2a3c",
//             borderRadius: "8px",
//           },
//           "&::-webkit-scrollbar-track": {
//             backgroundColor: "#1e1e2d",
//           },
//         }}
//       >
//         <Box sx={{ p: 3 }}>
//           <Box
//             bgcolor={"#242424"}
//             mb={3}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               borderRadius: 1,
//               padding: {
//                 xs: "12px 16px 12px 16px",
//                 sm: "16px 20px 16px 20px",
//               },
//             }}
//           >
//             {selectedItem?.name && (
//               <Typography
//                 sx={{
//                   fontSize: "18px",
//                   color: "#F2F2F7",
//                   fontWeight: "500",
//                   textAlign: "left",
//                   mb: 2,
//                 }}
//               >
//                 {selectedItem?.name}
//               </Typography>
//             )}

//             <Box sx={{ display: "flex", gap: 2, mb: 0 }}>
//               <TextField
//                 variant="outlined"
//                 size="small"
//                 type="number"
//                 value={passwordValue}
//                 onChange={handleInputChange}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     color: "#F2F2F7", // Text color
//                   },
//                   "&.Mui-disabled": {
//                     color: "#9e9e9e", // Text color when disabled
//                     "& fieldset": {
//                       borderColor: "#9e9e9e", // Border color when disabled
//                     },
//                     backgroundColor: "#e0e0e0", // Background color when disabled
//                   },
//                   width: "300px",
//                   color: "#F2F2F7",
//                   borderRadius: "4px",
//                 }}
//                 disabled={!selectedItem} // Disable if no quota is selected
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{
//                   height: "max-content",
//                   "&.Mui-disabled": {
//                     bgcolor: "#d3d3d3",
//                     color: "#9e9e9e",
//                     boxShadow: "none",
//                   },
//                 }}
//                 onClick={handleSave}
//               >
//                 Save
//               </Button>
//             </Box>
//           </Box>
//           <Box
//             sx={{
//               backgroundColor: "#2C2C2E",
//               padding: {
//                 xs: "12px 16px 12px 16px",
//                 sm: "16px 20px 16px 20px",
//               },
//               borderRadius: "8px",
//               height: { xs: "max-content", md: "auto" },
//               mt: 3,
//               width: { xs: "-webkit-fill-available" },
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "18px",
//                 color: "#F2F2F7",
//                 fontWeight: "500",
//                 textAlign: "left",
//                 mb: 2,
//               }}
//             >
//               Users Wallet History
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table sx={{ bgcolor: "#262626" }}>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ color: "#F2F2F7" }}>Name</TableCell>
//                     <TableCell sx={{ color: "#F2F2F7" }}>Email</TableCell>
//                     <TableCell sx={{ color: "#F2F2F7" }}>Level</TableCell>
//                     <TableCell sx={{ color: "#F2F2F7" }}>Hub</TableCell>
//                     <TableCell sx={{ color: "#F2F2F7" }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {data?.map((item) => (
//                     <TableRow key={item.id}>
//                       <TableCell sx={{ color: "#F2F2F7" }}>
//                         {item?.user?.name}
//                       </TableCell>
//                       <TableCell sx={{ color: "#F2F2F7" }}>
//                         {item?.user?.emailId}
//                       </TableCell>
//                       <TableCell sx={{ color: "#F2F2F7" }}>
//                         {item?.level}
//                       </TableCell>
//                       <TableCell sx={{ color: "#F2F2F7" }}>
//                         {item?.hubName}
//                       </TableCell>
//                       <TableCell>
//                         <IconButton
//                           onClick={() => handleEdit(item)}
//                           sx={{ bgcolor: "#2f2f2f" }}
//                         >
//                           <ModeEditOutlineOutlinedIcon
//                             sx={{ color: "#F2F2F7" }}
//                           />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default UsersDetailsWallet;

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

  const handleSave = async () => {
    if (selectedItem) {
      try {
        const response = await hub.patchUpdateUserPassword(selectedId, {
          newPassword: passwordValue,
        });
        if (response) {
          alert(" updated password successfully!");
        }
      } catch (error) {
        console.log(error, "error");
        alert("Failed to update quota");
      }
    } else {
      alert("Please select a user and enter a password before saving.");
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setSelectedId(item?.user?.id);
  };
  console.log(selectedItem, "selectedItem");

  const handleRowClick = (itemId) => {
    setExpandedRow(expandedRow === itemId ? null : itemId);
  };

  return (
    <Box
      marginLeft={{
        md: `${SideBarWidth}px`,
      }}
      onClick={() => {
        setActiveSideBar(false);
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
            flexDirection: "column",
            borderRadius: 1,
            padding: {
              xs: "12px 16px",
              sm: "16px 20px",
            },
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
              label="Select user change Password"
              value={passwordValue}
              onChange={handleInputChange}
              sx={{
                '& .MuiInputLabel-root': {
                    color: '#6f6f6f', // For the label color
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
                //   color: "#F2F2F7    ",
                  "& fieldset": {
                    borderColor: "#393939",
                    // color: "#F2F2F7",
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
