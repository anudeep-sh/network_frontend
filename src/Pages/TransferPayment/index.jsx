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
import { Colors } from "../../Theme/Theme";

export default function WithDrawalHistory() {
  const [walletHistory, setWalletHistory] = useState([]);

  const handleGetwalletHistory = async () => {
    try {
      const response = await WalletsRequests.WithdrawalRequestById();
      setWalletHistory(response);
    } catch (error) {}
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
          backgroundColor: "#ffffff",
          mt: 3,
          p: 3,
          borderRadius: "8px",
          mr: { xs: 2, md: 3 },
          ml: { xs: 2, md: 3 },
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
            Withdrawal Request
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
                  Amount (Rs.)
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
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {walletHistory?.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ "&:last-child td": { borderBottom: "none" } }}
                >
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      borderBottom: `1px solid ${Colors.dividerColor}`,
                    }}
                  >
                    {transaction.amount}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      borderBottom: `1px solid ${Colors.dividerColor}`,
                    }}
                  >
                    {transaction.status}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      borderBottom: `1px solid ${Colors.dividerColor}`,
                    }}
                  >
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
