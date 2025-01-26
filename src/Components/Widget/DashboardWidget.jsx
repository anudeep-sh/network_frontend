import { Box, Grid, Typography } from "@mui/material";
import { Colors } from "../../Theme/Theme";

export default function DashBoardWidget({ icon, title, value,hubs }) {
  return (
    <Box
      sx={{
        width: {
          xs: "calc(100% / 1 - 8px)", 
          md: "calc(100% / 2 - 16px)", 
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
        
        <Box textAlign={'left'}>
          <Typography
            sx={{
              color:Colors.secondaryColor,
              letterSpacing: "1%",
              fontWeight: "400",
              mb:'4px',
              fontSize: {
                xs: "12px",
                sm: "14px",
              },
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              letterSpacing: "1%",
              fontWeight: "600",
              color:Colors.primaryTextColor,
              fontSize: {
                xs: "20px",
                sm: "24px",
              },
            }}
          >
            {value}
          </Typography>
          </Box>
        {hubs?<img src={icon} alt={title}  />:<img src={icon} alt={title} height={40} width={40} />}
      </Box>
    </Box>
  );
}
