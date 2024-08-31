import { Box, Grid, Typography } from "@mui/material";
import { SideBarWidth } from "../../utils/SideBarWidth";
import DashBoardWidget from "../../Components/Widget/DashboardWidget";
import { widgetElements } from "../../utils/dashBoardWidgetElements";
import MembersTree from "../../Components/MembersTree/MembersTree";
import { useEffect, useState } from "react";
import Profile from "../../Assets/Images/person.svg";
import Wallet from "../../Assets/Images/wallet.svg";
import Income from "../../Assets/Images/income.svg";
import Withdrawal from "../../Assets/Images/withdrawal.svg";
import { handleAlert } from "../../utils/handleAlert";
import { WalletsRequests } from "../../api/requests/Wallets/wallets";
import GetValidatedTokenData from "../../utils/helper";
// import MembersTree from "../../Components/MembersTree";

export default function DashBoard({ setActiveSideBar }) {
  const [widgetData, setWidgetData] = useState([
    {
      icon: Profile,
      title: "Customers Id",
      value: "0",
    },
    {
      icon: Wallet,
      title: "Wallet",
      value: "Rs. 0",
    },
    {
      icon: Income,
      title: "Total Income",
      value: "Rs. 0",
    },
    {
      icon: Withdrawal,
      title: "Pending Withdrawal",
      value: "Rs. 0",
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = GetValidatedTokenData();
    const getWalletData = async () => {
      try {
        const response = await WalletsRequests.getWalletHistory();
        console.log(response, data, "response.data");
        let totalCredit = 0;
        let totalWithdrawal = 0;

        response?.data?.forEach((transaction) => {
          if (transaction.type === "CREDIT") {
            totalCredit += parseFloat(transaction.amount);
          } else if (transaction.type === "WITHDRAWAL") {
            totalWithdrawal += parseFloat(transaction.amount);
          }
        });
        setWidgetData([
          {
            icon: Profile,
            title: "Shortcode",
            value: data.userPayload.shortcode,
          },
          {
            icon: Wallet,
            title: "Wallet",
            value: `Rs. ${
            totalCredit
            }`,
          },
          {
            icon: Income,
            title: "Total Income",
            value: `Rs. ${
              totalWithdrawal+totalCredit
            }`,
          },
          {
            icon: Withdrawal,
            title: "Total Withdrawal",
            value: `Rs. ${
             totalWithdrawal
            }`,
          },
        ]);
        console.log("response", response);
        setLoading(false);
      } catch (error) {
        handleAlert("Something went wrong", "error");
        setLoading(false);
      }
    };
    getWalletData();
  }, []);

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
      height={"100vh"}
    >
      <Box
        height={"fit-content"}
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mr: { xs: 2, md: 3 },
          ml: { xs: 2, md: 3 },
        }}
      >
        {widgetData?.map((element, index) => (
          <DashBoardWidget
            key={index}
            icon={element.icon}
            title={element.title}
            value={element.value}
          />
        ))}
      </Box>
      {/* <MembersTree /> */}
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
          sx={{
            fontSize: "18px",
            color: "#F2F2F7",
            fontWeight: "500",
            textAlign: "left",
            mb: 3,
          }}
        >
          Members Tree
        </Typography>
        <MembersTree />
      </Box>
    </Box>
  );
}