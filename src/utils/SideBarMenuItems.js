import {
  AttachMoney,
  DiamondOutlined,
  Diversity1,
  Diversity3,
  Group,
  History,
  Home,
  Link,
  Logout,
  Payments,
  Person,
  PersonAdd,
  ReceiptLong,
  Settings,
  SupportAgent,
} from "@mui/icons-material";

export const SideBarItems = [
  {
    Icon: (
      <Home
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/dashboard",
    title: "Dashboard",
    active: true,
    onClick: () => console.log("Home"),
  },

  {
    Icon: (
      <DiamondOutlined
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/hubs",
    title: "Hubs",
    active: true,
    onClick: () => console.log("Hubs"),
  },

  {
    Icon: (
      <Payments
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/transactions",
    title: "Transactions",
    active: true,
    onClick: () => console.log("Transactions"),
  },
  {
    Icon: (
      <AttachMoney
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/withdrawal-history",
    title: "WithDrawal History",
    active: true,
    onClick: () => console.log("Transfer money"),
  },
  {
    Icon: (
      <History
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/withdrawal",
    title: "WithDrawal",
    active: true,
    onClick: () => console.log("Income history"),
  },
  {
    Icon: (
      <AttachMoney
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/insurance-policy",
    title: "Insurance Policy",
    active: true,
    onClick: () => console.log("Transfer money"),
  },
];

export const sideBarBottomItems = [
  {
    Icon: (
      <Settings
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/profile",
    title: "Account",
    active: true,
    onClick: () => console.log("Account"),
  },
  {
    Icon: (
      <Logout
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    title: "Logout",
    onClick: () => {
      localStorage.removeItem("Token");
      localStorage.removeItem("Role");
      localStorage.removeItem("user_details");
      console.log("Logout");
      window.location.href = "/";
    },
  },
];
