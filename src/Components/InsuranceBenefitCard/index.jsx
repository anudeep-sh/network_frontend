import { Box, Typography } from "@mui/material";
import React from "react";

const InsuranceBenefitCard = ({
  icon,
  title,
  description,
  whyChooseUsData = false,
}) => {
  return (
    <Box
      sx={{
        width: {
          xs: "calc(100% / 1 - 8px)", 
          md: "calc(100% / 2 - 16px)",
          lg: whyChooseUsData
            ? "calc(100% / 4 - 16px)"
            : "calc(100% / 3 - 16px)",
        },
        display: "flex",
        flexDirection: "column",
        mb: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: whyChooseUsData ? "#f3f4f8" : "#ffffff",
          padding: {
            xs: "16px",
            sm: " 20px",
          },
          borderRadius: "8px",
          minHeight: "-webkit-fill-available!important",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        {!whyChooseUsData && (
          <img
            src={icon}
            alt={title}
            style={{
              width: "48px",
              height: "48px",
              objectFit: "cover",
              alignSelf: "center",
              marginBottom: "12px",
            }}
          />
        )}
        <Typography
          variant="h6"
          sx={{ fontWeight: "600", mb: 0.5, color: "#1F4CC1" }}
          className={"poppins-font"}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ color: "#3C3C3C", mb: whyChooseUsData ? 2 : 0 }}
          className={"poppins-font"}
        >
          {description}
        </Typography>
        {whyChooseUsData && (
          <Box
            sx={{
              width: "max-content",
              backgroundColor: "#1f4cc112",
              borderRadius: 50,
              padding: 2,
              margin: "0 auto",
            }}
          >
            <img
              src={icon}
              alt={title}
              style={{
                objectFit: "cover",
                marginBottom: "0px",
                maxWidth: "64px",
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default InsuranceBenefitCard;
