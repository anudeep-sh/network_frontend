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

export default function UserWithdrawal({ setActiveSideBar }) {
  const [wallettData, setWallettData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const getWithdrawals = async () => {
    try {
      const data = await hub.getWithdrawals();
      console.log(data, "data");
      setWallettData(data.data);
    } catch (error) {
      alert(error?.response?.data);
      console.log(error, "error");
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
        // Optionally, update the state with the new quota value

        setSelectedItem(null);
      } catch (error) {
        console.log(error, "error");
        alert("Failed to update quota");
      }
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    console.log(item, "item");
    // setSelectedLevel(1); // Default to Level 1
    setInputValue(item.id); // Set the input to Level 1 quota by default
  };
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
              sx={{
                fontSize: "18px",
                color: "#3C3C3C",
                fontWeight: "500",
                textAlign: "left",
                mb: 2,
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
               letterSpacing:1,
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
                height: "max-content",
                "&.Mui-disabled": {
                  bgcolor: "#d3d3d3", // Color when disabled
                  color: "#9e9e9e", // Text color when disabled
                  boxShadow: "none", // Remove shadow when disabled
                },
              }}
              onClick={handleSave}
              disabled={!selectedItem} // Disable if no quota is selected
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
          <Typography
            sx={{
              fontSize: "18px",
              color: "#3C3C3C",
              fontWeight: "500",
              textAlign: "left",
              mb: 2,
            }}
          >
            Quotas Available
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ bgcolor: "#f3f4f8" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#3C3C3C" }}>Name</TableCell>
                  <TableCell sx={{ color: "#3C3C3C" }}>Email</TableCell>
                  <TableCell sx={{ color: "#3C3C3C" }}>Shortcode</TableCell>
                  <TableCell sx={{ color: "#3C3C3C" }}>Amount</TableCell>
                  <TableCell sx={{ color: "#3C3C3C" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wallettData?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ color: "#3C3C3C" }}>
                      {item.user_name}
                    </TableCell>
                    <TableCell sx={{ color: "#3C3C3C" }}>
                      {item.user_email}
                    </TableCell>
                    <TableCell sx={{ color: "#3C3C3C" }}>
                      {item.user_shortcode}
                    </TableCell>
                    <TableCell sx={{ color: "#3C3C3C" }}>
                      {item.amount}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(item)}
                        sx={{ bgcolor: "#fff" }}
                      >
                        <ModeEditOutlineOutlinedIcon
                          sx={{ color: "#3C3C3C" }}
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
