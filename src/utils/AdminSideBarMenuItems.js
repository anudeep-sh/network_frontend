import { Link, PersonAdd } from "@mui/icons-material";

export const AdminSideBarMenuItems = [
  {
    Icon: (
      <PersonAdd
        sx={{
          height: "20px",
          width: "20px",
        }}
      />
    ),
    path: "/user-quotas",
    title: "User Quotas",
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
    path: "/user-withdrawal", 
    title: "User Withdrawal",
    active: true,
    onClick: () => console.log("Referral Link"),
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
    path: "/approved-withdrawal", 
    title: "Approved Withdrawals",
    active: true,
    onClick: () => console.log("Referral Link"),
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
    path: "/users-detail-withdrawal", 
    title: "Users Wallet",
    active: true,
    onClick: () => console.log("Referral Link"),
  },
];
