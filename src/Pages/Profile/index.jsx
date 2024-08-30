import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { SideBarWidth } from "../../utils/SideBarWidth";
import { hub } from "../../api/requests/hubs/hubs";

const Profile = ({ setActiveSideBar }) => {
  const [userId, setUserId] = useState(null);

  const getUserDetail = async () => {
    try {
      const data = await hub.getUsersDetails();
      setUserId(data?.data?.id);
      setFormData({
        pan_number: data?.data?.pan_number || "",
        aadhar_number: data?.data?.aadhar_number || "",
        bank_account_number: data?.data?.bank_account_number || "",
        ifsc_code: data?.data?.ifsc_code || "",
        upi_linkedin_number: data?.data?.upi_linkedin_number || "",
      });
    } catch (error) {
      alert(error?.response?.data);
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const [formData, setFormData] = useState({
    pan_number: "",
    aadhar_number: "",
    bank_account_number: "",
    ifsc_code: "",
    upi_linkedin_number: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const requestBody = {
      userId: userId,
      ...formData,
    };
    // Make your PATCH call here with the requestBody
    try {
      const response = await hub.patchUpdateUserDetails(requestBody);
      if (response) {
        alert(" updated successfully!");
      }
      // Optionally, update the state with the new quota value
    } catch (error) {
      console.log(error, "error");
      alert("Failed to update quota");
    }
  };

  return (
    <Box
      onClick={() => {
        // setActiveSideBar(false);
      }}
      sx={{
        width: { xs: "100%", md: `calc(100% - ${SideBarWidth}px)` },
        ml: { md: `${SideBarWidth}px` },

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
              xs: "24px 16px 20px 16px",
              sm: "24px 20px 20px 20px",
            },
            width: { xs: "-webkit-fill-available", md: "300px" }, // Set the Box width to 300px
          }}
        >
          <TextField
            name="pan_number"
            label="PAN Number"
            variant="outlined"
            size="small"
            type="text"
            value={formData.pan_number}
            onChange={handleChange}
            sx={{
              marginBottom: 3,

              "& .MuiOutlinedInput-root": {
                color: "#F2F2F7",
                "& fieldset": {
                  borderColor: "#6f6f6f",
                },
                "&:hover fieldset": {
                  borderColor: "#6f6f6f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6f6f6f",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#b4b4b4",
              },
              borderRadius: "4px",
            }}
          />
          <TextField
            name="aadhar_number"
            label="Aadhar Number"
            variant="outlined"
            size="small"
            type="number"
            value={formData.aadhar_number}
            onChange={handleChange}
            sx={{
              marginBottom: 3,

              "& .MuiOutlinedInput-root": {
                color: "#F2F2F7",
                "& fieldset": {
                  borderColor: "#6f6f6f",
                },
                "&:hover fieldset": {
                  borderColor: "#6f6f6f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6f6f6f",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#b4b4b4",
              },
              borderRadius: "4px",
            }}
          />
          <TextField
            name="bank_account_number"
            label="Bank Account Number"
            variant="outlined"
            size="small"
            type="text"
            value={formData.bank_account_number}
            onChange={handleChange}
            sx={{
              marginBottom: 3,
              "& .MuiInputLabel-root": {
                color: "#b4b4b4",
              },
              "& .MuiOutlinedInput-root": {
                color: "#F2F2F7",
                "& fieldset": {
                  borderColor: "#6f6f6f",
                },
                "&:hover fieldset": {
                  borderColor: "#6f6f6f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6f6f6f",
                },
              },
              borderRadius: "4px",
            }}
          />
          <TextField
            name="ifsc_code"
            label="IFSC Code"
            variant="outlined"
            size="small"
            type="text"
            value={formData.ifsc_code}
            onChange={handleChange}
            sx={{
              marginBottom: 3,

              "& .MuiOutlinedInput-root": {
                color: "#F2F2F7",
                "& fieldset": {
                  borderColor: "#6f6f6f",
                },
                "&:hover fieldset": {
                  borderColor: "#6f6f6f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6f6f6f",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#b4b4b4",
              },
              borderRadius: "4px",
            }}
          />
          <TextField
            name="upi_linkedin_number"
            label="UPI Linked Number"
            variant="outlined"
            size="small"
            type="text"
            value={formData.upi_linkedin_number}
            onChange={handleChange}
            sx={{
              marginBottom: 3,

              "& .MuiOutlinedInput-root": {
                color: "#F2F2F7",
                "& fieldset": {
                  borderColor: "#6f6f6f",
                },
                "&:hover fieldset": {
                  borderColor: "#6f6f6f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6f6f6f",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#b4b4b4",
              },

              borderRadius: "4px",
            }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#F2F2F7",
              color: "#242424",
              marginTop: 1,
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
