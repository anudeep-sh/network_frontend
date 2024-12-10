import { Box, Grid, Typography } from "@mui/material";

export default function DashBoardWidget({ icon, title, value,hubs }) {
  return (
    <Box
      sx={{
        width: {
          xs: "calc(100% / 2 - 8px)", // For xs and sm breakpoints
          md: "calc(100% / 2 - 16px)", // For md and lg breakpoints
        },
        mb: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: {
            xs: "12px 16px 12px 16px",
            sm: "16px 20px 16px 20px",
          },
          borderRadius: "8px",
          height: "88px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          style={{
            color: "#3C3C3C",
            textAlign: "start",
          }}
        >
          <Typography
            component="span"
            sx={{
              letterSpacing: "1%",
              fontWeight: "400",
              fontSize: {
                xs: "12px",
                sm: "14px",
              },
            }}
          >
            {title}
          </Typography>
          <br />
          <Typography
            component="span"
            sx={{
              letterSpacing: "1%",
              fontWeight: "600",
              fontSize: {
                xs: "20px",
                sm: "24px",
              },
            }}
          >
            {value}
          </Typography>
        </Typography>
        {hubs?<img src={icon} alt={title}  />:<img src={icon} alt={title} height={40} width={40} />}
      </Box>
    </Box>
  );
}
