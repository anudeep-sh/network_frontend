import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { SideBarWidth } from "../../utils/SideBarWidth";
import { WalletsRequests } from "../../api/requests/Wallets/wallets";

export default function Transactions() {
  const [walletHistory, setWalletHistory] = useState([]);
  const handleGetwalletHistory = async () => {
    try {
      const response = await WalletsRequests.getWalletHistory();
      setWalletHistory(response.data); // Update the state with the new data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetwalletHistory();
  }, []);
  return (
    <Box
      sx={{
        width: { xs: "100%", md: `calc(100% - ${SideBarWidth}px)` },
        ml: { md: `${SideBarWidth}px` },
      }}
      height={"100vh"}
    >
      <Box
        sx={{
          backgroundColor: "#2C2C2E",
          mt: 3,
          p: 3,
          borderRadius: "8px",
          mr: { xs: 2, md: 3 },
          ml: { xs: 2, md: 3 },
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#F2F2F7", marginBottom: "16px" }}
        >
          Wallet History
        </Typography>

        <TableContainer component={Paper} sx={{ backgroundColor: "#2C2C2E" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#F2F2F7" }}>
                  Transaction Type
                </TableCell>
                <TableCell sx={{ color: "#F2F2F7" }}>Amount (Rs.)</TableCell>
                <TableCell sx={{ color: "#F2F2F7" }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {walletHistory?.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell sx={{ color: "#F2F2F7" }}>
                    {transaction.type}
                  </TableCell>
                  <TableCell sx={{ color: "#F2F2F7" }}>
                    {transaction.amount}
                  </TableCell>
                  <TableCell sx={{ color: "#A1A1AA" }}>
                    {new Date(transaction.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
