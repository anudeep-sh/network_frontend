import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const InputBox = ({
  label,
  type,
  value,
  onChange,
  showPasswordToggle,
  required,
  error,
  helperText,
  name,
  onKeyDown,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Box mb={"25px"} width={"100%"}>
      <Typography
        display={"flex"}
        marginRight={"auto"}
        mb={"5px"}
        fontSize={"12px"}
      >
        {label}
      </Typography>
      <TextField
        required={required}
        placeholder={placeholder}
        type={showPasswordToggle && showPassword ? "text" : type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        variant="outlined"
        fullWidth
        error={error}
        helperText={helperText}
        InputProps={
          ({ textAlign: "center" },
          showPasswordToggle
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null)
        }
        content="center"
        sx={{
          "& .MuiInputBase-root": {
            height: "40px",
          },
          '& .MuiInputBase-input': {
            padding: '9px 12px',
          }
        }}
      />
    </Box>
  );
};

export default InputBox;
