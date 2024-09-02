import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { SideBarWidth } from "../../utils/SideBarWidth";
import { hub } from "../../api/requests/hubs/hubs";

const Profile = ({ setActiveSideBar }) => {
  const [userId, setUserId] = useState(null);
  const [passwordValue, setPasswordValue] = useState("");

  const getUserDetail = async () => {
    try {
      const data = await hub.getUsersDetails();
      setUserId(data?.data?.id);
      console.log(data.data,"data.data")
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

  const handleInputChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleUpdatePassword = async () => {
    if (userId) {
      try {
        const response = await hub.patchUpdateUserPassword(userId, {
          newPassword: passwordValue,
        });
        console.log(response,"response")
        if (response) {
          alert(" updated password successfully!");
          setPasswordValue("")
        }
      } catch (error) {
        console.log(error, "error");
        alert("Failed to update quota");
        setPasswordValue("")
      }
    } else {
      alert("Please select a user and enter a password before saving.");
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
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
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
          <Typography
            sx={{
              fontSize: "18px",
              color: "#F2F2F7",
              fontWeight: "500",
              textAlign: "left",
              mb: 3,
            }}
          >
            Your Info
          </Typography>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "max-content",
            backgroundColor: "#242424",
            borderRadius: 1,
            padding: {
              xs: "24px 16px 20px 16px",
              sm: "24px 20px 20px 20px",
            },
            mr: { xs: 0, md: 3 },
            ml: { xs: 0, md: 3 },
            width: { xs: "-webkit-fill-available", md: "300px" }, // Set the Box width to 300px
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              color: "#F2F2F7",
              fontWeight: "500",
              textAlign: "left",
              mb: 3,
            }}
          >
            Change Your Password
          </Typography>
          <TextField
            name="Change Password"
            label="Chnage Password"
            variant="outlined"
            size="small"
            type="text"
            value={passwordValue}
            onChange={handleInputChange}
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
            onClick={handleUpdatePassword}
            sx={{
              backgroundColor: "#F2F2F7",
              color: "#242424",
              marginTop: 1,
            }}
            disabled={!passwordValue}

          >
            Update Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
