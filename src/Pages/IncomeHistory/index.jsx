import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { SideBarWidth } from "../../utils/SideBarWidth";
import { WalletsRequests } from "../../api/requests/Wallets/wallets"; // Assuming this is where the API call is made

export default function Withdraw() {
  const [amount, setAmount] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // API call to request a withdrawal
      console.log(amount)
      const response = await WalletsRequests.WithdrawalRequest( amount );
      
      if (response) {
        alert("Withdrawal request submitted successfully!");
        setAmount(""); // Clear the input field after successful submission
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: `calc(100% - ${SideBarWidth}px)` },
        ml: { md: `${SideBarWidth}px` },
      }}
      height={"100vh"}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="form"
        onSubmit={handleWithdraw}
        sx={{
          backgroundColor: "#2C2C2E",
          padding: "24px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#F2F2F7", marginBottom: "16px", textAlign: "center" }}
        >
          Withdrawal Form
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Amount (Rs.)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          sx={{
            marginBottom: "16px",
            input: { color: "#F2F2F7" },
            label: { color: "#F2F2F7" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#F2F2F7",
              },
              "&:hover fieldset": {
                borderColor: "#F2F2F7",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#F2F2F7",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "#F2F2F7" },
          }}
          InputProps={{
            style: { color: "#F2F2F7" },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#007AFF",
            "&:hover": {
              backgroundColor: "#005BB5",
            },
          }}
        >
          Submit Withdrawal
        </Button>
      </Box>
    </Box>
  );
}
