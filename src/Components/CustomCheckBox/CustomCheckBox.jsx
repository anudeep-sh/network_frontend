import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      sx={{
        "& .MuiTypography-root": {
          fontSize: "0.875rem",
        },
      }}
      control={
        <Checkbox checked={checked} onChange={onChange} color="primary" />
      }
      label={label}
    />
  );
};

export default CustomCheckbox;
