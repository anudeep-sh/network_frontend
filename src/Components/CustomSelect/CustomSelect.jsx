import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const CustomSelect = ({
    usingInDarkMode,
  label,
  value,
  onChange,
  required = false,
  helperText = "",
  error = false,
  options = [],
  disabled
}) => {
  return (
    <Box mb={"25px"} width={"100%"} sx={{mb:0}}>
     {label&& <Typography
        display={"flex"}
        marginRight={"auto"}
        mb={"5px"}
        fontSize={"12px"}
        color="#F2F2F7" // Adjust the color as needed
      >
        {label}
      </Typography>}
      <FormControl
        required={required}
        fullWidth
        error={error}
        sx={{
          "& .MuiInputBase-root": {
            height: "40px", // Adjust height
            color:usingInDarkMode? '#f2f2f2': '#000000de',

          },
          "& .MuiSelect-select": {
            padding: "9px 12px", // Adjust padding
            textAlign: "left", // Center the text
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: error ? "red" : "#6A6B6E", // Conditional border color
            },
            "&:hover fieldset": {
              borderColor: error ? "red" : "#F2F2F7", // Hover effect
            },
            "&.Mui-focused fieldset": {
              borderColor: "#F2F2F7", // Focused state border color
            },
          },
        }}
      >
        {/* <InputLabel sx={{ color: "#F2F2F7" }}>{label}</InputLabel> */}
        <Select
          value={value}
          onChange={onChange}
          disabled={disabled}
          displayEmpty
          sx={{
            "& .MuiSelect-icon": {
              color: "#F2F2F7", // Color of dropdown icon
            },
            '&:hover fieldset': {
              borderWidth: '1px', // Set border width to 1px on hover
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px', // Ensure border width is 1px when focused
            },
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && (
          <Typography variant="caption" color="error">
            {helperText}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
