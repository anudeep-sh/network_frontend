import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({
  onClick,
  children,
  disabled,
  customStyles,
  borderRadius,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      fullWidth
      disabled={disabled}
      sx={{
        borderRadius: borderRadius ? borderRadius : "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...customStyles,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
