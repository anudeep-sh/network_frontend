import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SideBarWidth } from "../../utils/SideBarWidth";
import GetValidatedTokenData from "../../utils/helper";
import styled from "@emotion/styled";
import axios from "axios";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: "#F2F2F7",
  },
  "& .MuiInputLabel-root": {
    color: "#afafb3",
    "&.Mui-disabled": {
      color: "#A6A6A6",
    },
  },

  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#afafb3",
    },
    "&.Mui-disabled fieldset": {
      borderColor: "#A6A6A6",
    },
    "&:hover fieldset": {
      borderColor: "#F2F2F7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F2F2F7",
    },
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#A6A6A6",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "red",
  },
}));

const InsurancePolicy = () => {
  const [urc, setUrc] = useState("");
  const [umc, setUmc] = useState("");
  const [ak, setAk] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [pin, setPin] = useState("");
  const [adh, setAdh] = useState("");
  const [pan, setPan] = useState("");

  const [adhError, setAdhError] = useState("");
  const [panError, setPanError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [pinError, setPinError] = useState("");
  const validateAadhaar = (value) => {
    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(value)) {
      setAdhError("Aadhaar must be 12 digits.");
      return false;
    }
    setAdhError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setEmailError("Enter a valid email id");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhno(value);

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError("Enter a valid 10-digit phone number");
    } else {
      setPhoneError("");
    }
  };

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPin(value);
    const pinRegex = /^[1-9][0-9]{5}$/;
    if (!pinRegex.test(value)) {
      setPinError("Pin code is not valid");
    } else {
      setPinError("");
    }
  };

  const validatePAN = (value) => {
    const panRegex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
    if (!panRegex.test(value)) {
      setPanError("PAN format is invalid (e.g., ABCDE1234F).");
      return false;
    }
    setPanError("");
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const isAadhaarValid = validateAadhaar(adh);
    const isPanValid = validatePAN(pan);

    if (!isAadhaarValid || !isPanValid) {
      alert("Validation failed. Please fix errors and try again.");
      return;
    }

    const postData = {
      urc,
      umc,
      ak,
      fname,
      lname,
      email,
      phno,
      pin,
      adh,
      pan,
    };
    if (postData) {
      const objJson = JSON.stringify(postData);
      const postDataBase64 = btoa(objJson);
      if (postDataBase64) {
        submitHiddenForm(postDataBase64);
        setUmc("");
        setFname("");
        setLname("");
        setEmail("");
        setPhno("");
        setPin("");
        setAdh("");
        setPan("");
      }
    }
  };

  const submitHiddenForm = (postDataBase64) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://uatnew.gibl.in/wallet/validate2/";
    form.target = "_blank";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "ret_data";
    input.value = postDataBase64;

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();

    document.body.removeChild(form);
  };


  const ganerateUniqueSessionId = (length = 10) => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let sessionId = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      sessionId += characters[randomIndex];
    }
    return sessionId;
  };

  useEffect(() => {
    const response = GetValidatedTokenData();
    setUrc(response?.userPayload?.shortcode);
    setAk(ganerateUniqueSessionId(10));
  }, []);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        flexGrow: 1,
        m: 0,
        width: { sm: `calc(100% - ${SideBarWidth}px)` },
        ml: { sm: `${SideBarWidth}px` },
      }}
    >
      <Grid item xs={12} md={9} lg={6}>
        <Grid
          container
          component="form"
          onSubmit={submitForm}
          sx={{
            py: "16px!important",
            px: "16px",
            backgroundColor: "#242424",
          }}
        >
          <Grid item xs={12} p={2} sx={{ pt: 0, mb: 2 }}>
            <Typography variant="h5" sx={{ color: "#fff" }}>
              {" "}
              Insurance Policy
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            pt="0px!important"
            pl="0px!important"
            sx={{
              mb: 2.5,
              pr: { md: "8px!important", xs: "0px!important" },
            }}
          >
            <StyledTextField
              sx={{ mr: 2 }}
              size="small"
              required
              id="outlined-basic"
              label="Retailer Code"
              type="number"
              fullWidth
              variant="outlined"
              value={urc}
              disabled={urc}
              onChange={(event) => setUrc(event.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            pt="0px!important"
            sx={{
              pl: { md: "8px!important", xs: "0px!important" },
              mb: 2.5,
            }}
          >
            <StyledTextField
              size="small"
              required
              id="outlined-basic"
              label="Master Code"
              variant="outlined"
              type="number"
              fullWidth
              value={umc}
              onChange={(event) => setUmc(event.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            pt="0px!important"
            sx={{
              pr: { md: "8px!important", xs: "0px!important" },
              mb: 2.5,
            }}
          >
            <StyledTextField
              required
              size="small"
              id="outlined-basic"
              label="Unique Session Id"
              variant="outlined"
              type="text"
              disabled={ak}
              fullWidth
              value={ak}
              onChange={(event) => setAk(event.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            pt="0px!important"
            sx={{
              pl: { md: "8px!important", xs: "0px!important" },
              mb: 2.5,
            }}
          >
            <StyledTextField
              required
              size="small"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="text"
              helperText={emailError}
              fullWidth
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            pt="0px!important"
            sx={{
              pr: { md: "8px!important", xs: "0px!important" },
              mb: 2.5,
            }}
          >
            <StyledTextField
              required
              size="small"
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              type="text"
              fullWidth
              value={fname}
              onChange={(event) => setFname(event.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            pt="0px!important"
            sx={{
              pl: { md: "8px!important", xs: "0px!important" },
              mb: 2.5,
            }}
          >
            <StyledTextField
              required
              size="small"
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              type="text"
              fullWidth
              value={lname}
              onChange={(event) => setLname(event.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            pt="0px!important"
            sx={{
              pr: { md: "8px!important", xs: "0px!important" },
              mb: 2.5,
            }}
          >
            <StyledTextField
              required
              size="small"
              id="outlined-basic"
              label="Phone No"
              variant="outlined"
              type="text"
              fullWidth
              value={phno}
              helperText={phoneError}
              onChange={handlePhoneChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            pt="0px!important"
            sx={{
              pl: { md: "8px!important", xs: "0px!important" },
              mb: 2.5,
            }}
          >
            <StyledTextField
              required
              size="small"
              id="outlined-basic"
              label="Pin Code"
              variant="outlined"
              type="text"
              fullWidth
              helperText={pinError}
              value={pin}
              onChange={handlePinChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            pt="0px!important"
            sx={{
              pr: { md: "8px!important", xs: "0px!important" },
              mb: 2.5,
            }}
          >
            <StyledTextField
              required
              size="small"
              id="outlined-basic"
              label="Aadhaar No"
              variant="outlined"
              type="text"
              fullWidth
              value={adh}
              helperText={adhError}
              onChange={(event) => {
                const value = event.target.value;
                setAdh(value);
                validateAadhaar(value);
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            pt="0px!important"
            sx={{
              pl: { md: "8px!important", xs: "0px!important" },
              mb: 2.5,
            }}
          >
            <StyledTextField
              required
              size="small"
              id="outlined-basic"
              label="Pan No"
              variant="outlined"
              type="text"
              fullWidth
              value={pan}
              helperText={panError}
              onChange={(event) => {
                const value = event.target.value.toUpperCase();
                setPan(value);
                validatePAN(value);
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            pt="0px!important"
            sx={{
              pr: { md: "8px!important", xs: "0px!important" },
              mb: 2.5,
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#007AFF",
                "&:hover": {
                  backgroundColor: "#005BB5",
                },
              }}
            >
              Next Step
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InsurancePolicy;
