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
    path: "/packages",
    title: "Packages",
    active: true,
    onClick: () => console.log("Packages"),
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
      <Diversity1
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/network",
    title: "Network",
    menuList: ["GeneaLogy", "Tree"],
    active: true,
    onClick: () => console.log("Network"),
  },
  {
    Icon: (
      <Diversity3
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/my-referrals",
    title: "My Referrals",
    active: true,
    onClick: () => console.log("My referrals"),
  },
  {
    Icon: (
      <Group
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/total-teams",
    title: "Total Teams",
    active: true,
    onClick: () => console.log("Total Teams"),
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
      <Person
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/profile",
    title: "Profile",
    active: true,
    onClick: () => console.log("Profile"),
  },
  {
    Icon: (
      <PersonAdd
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/add-member",
    title: "Add Member",
    active: true,
    onClick: () => console.log("Add Member"),
  },
  {
    Icon: (
      <Link
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/referral-link",
    title: "Referral Link",
    active: true,
    onClick: () => console.log("Referral Link"),
  },
  {
    Icon: (
      <SupportAgent
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/support",
    title: "Support",
    active: true,
    onClick: () => console.log("Support"),
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
    path: "/settings",
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
      console.log("Logout");
      window.location.href = "/";
    },
  },
];
