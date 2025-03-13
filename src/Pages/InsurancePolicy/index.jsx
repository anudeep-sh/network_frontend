import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SideBarWidth } from "../../utils/SideBarWidth";
import GetValidatedTokenData from "../../utils/helper";
import styled from "@emotion/styled";
import axios from "axios";
import LogoUrl from "../../Assets/Images/networkLogo.png";
import heroImage from "../../Assets/Images/pana.png";
import HospitalIcon from "../../Assets/Images/insurance/ph_hospital.png";
import ClaimIcon from "../../Assets/Images/insurance/claims.png";
import OfficesIcon from "../../Assets/Images/insurance/building-office-thin.png";
import CheckIcon from "../../Assets/Images/insurance/check.png";
import InsuranceBenefitCard from "../../Components/InsuranceBenefitCard";
import { Colors } from "../../Theme/Theme";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontFamily: "'Poppins', sans-serif",
    color: "#3C3C3C",
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Poppins', sans-serif",
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
      borderColor: "#3C3C3C",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3C3C3C",
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
  const [cardData, setCardData] = useState([
    {
      icon: CheckIcon,
      title: "Anywhere Cashless Claims",
      description:
        "Now avail Anywhere Cashless Claims all across India. With 14000+ Network Hospitals, we are also one of India's widest medical coverage providers.",
    },
    {
      icon: CheckIcon,
      title: "24*7 Customer Service",
      description:
        "Call us at 1800-425-2255 for claim intimation, telehealth services and to clear your queries.",
    },
    {
      icon: CheckIcon,
      title: "In-house Claim Settlement",
      description:
        "We're the first Standalone Health Insurance company to settle the claims without any TPA's instead you are secured by our qualified in-house team.",
    },
    {
      icon: CheckIcon,
      title: "Claim Settlement",
      description:
        "90% of our claims are settled under cashless within 2hrs and 92% of claims are settled under reimbursement within 7days.",
    },
    {
      icon: CheckIcon,
      title: "Hospitals",
      description:
        "Hospitals We got you covered by offering best health insurance plans under our valuable service providers, agreed network and network hospitals for quality treatment.",
    },
    {
      icon: CheckIcon,
      title: "Awards",
      description:
        "We've been awarded for innovative product. best claim settlement and service provider from reputed survey organisations.",
    },
  ]);
  const [whyChooseUsData, setWhyChooseUsData] = useState([
    {
      icon: HospitalIcon,
      title: "1000+",
      description: "Network Hospitals to avail cashless claims",
    },
    {
      icon: ClaimIcon,
      title: "89%",
      description: "Cashless claims settled within 2 hours guaranteed.",
    },
    {
      icon: OfficesIcon,
      title: "300+",
      description: "Branch offices available nationwide in India.",
    },
    {
      icon: CheckIcon,
      title: "1000+",
      description: "Claims settled since 2024 inception",
    },
  ]);
  const [urc, setUrc] = useState("");
  const [umc, setUmc] = useState(573617);
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
        width: {
          xs: "100%",
          md: `calc(100% - ${SideBarWidth}px)`,
        },
        ml: { md: `${SideBarWidth}px` },
        p: 0,
      }}
      alignItems="stretch"
    >
      {" "}
      <Grid
        item
        xs={12}
        md={6}
        lg={8}
        sx={{
          pr: { xs: 2, md: 0 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          sx={{
            py: { xs: 3, md: 4 },
            px: { xs: 2, md: 4 },
            backgroundColor: "#ffffff",
            borderRadius: 2,
            height: "100%",
          }}
          alignItems="stretch"
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              textAlign: "left",
              alignContent: "center",
              mb: { xs: 4, md: 0 },
            }}
          >
            <img
              src={LogoUrl}
              alt="Network Logo"
              height={"70px"}
              width={"80px"}
              style={{ objectFit: "cover", marginBottom: "28px" }}
            />
            <Typography
              className={"poppins-font"}
              fontWeight={"700"}
              variant="h4"
              mb={1.5}
              color={Colors.primaryTextColor}
            >
              Insurance is the Key to Your Financial Security{" "}
            </Typography>
            <Typography
              className={"poppins-font"}
              variant="subtitle2"
              sx={{}}
              color={Colors.secondaryColor}
            >
              Comprehensive Coverage for Every Aspect of Your Life
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ alignContent: "center" }}>
            <img
              src={heroImage}
              alt="HeroImage"
              height={"100%"}
              width={"100%"}
              style={{ objectFit: "contain", marginBottom: "0px" }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{ pr: 2 }}>
        <Grid
          container
          component="form"
          onSubmit={submitForm}
          sx={{
            py: "16px!important",
            px: "16px",
            backgroundColor: "#ffffff",
            borderRadius: 2,
          }}
        >
          <Grid item xs={12} p={2} sx={{ pt: 0, mb: 2, pl: 0 }}>
            <Typography
              className={"poppins-font"}
              fontWeight={"500"}
              variant="h5"
              sx={{ color: Colors.primaryTextColor, textAlign: "left", mb: 2 }}
            >
              Insurance Policy
            </Typography>
            <Divider sx={{ borderColor: Colors.dividerColor }} />
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
              disabled={umc}
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
              // mb: 2.5,
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={"poppins-font"}
              color="primary"
              sx={{
                backgroundColor: Colors.primary,
                color: Colors.white,
                "&:hover": {
                  backgroundColor: Colors.hoverColorBtn,
                },
              }}
            >
              Next Step
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ pr: { xs: 2 }, mb: 2 }}>
        <Grid
          container
          sx={{
            pt: { xs: 3, md: 4 },
            px: { xs: 2, md: 4 },
            pb: 2,
            backgroundColor: "#ffffff",
            height: "100%",
            borderRadius: 2,
          }}
          alignItems="stretch"
        >
          <Grid item xs={12} sx={{ textAlign: "left", mb: 3 }}>
            <Typography
              className={"poppins-font"}
              fontWeight={"500"}
              variant="h4"
              sx={{mb:{xs:2,md:3}}}
              color={Colors.primaryTextColor}
            >
              Why Choose Us
            </Typography>
            <Divider sx={{ borderColor: Colors.dividerColor }} />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "stretch",
                flexWrap: "wrap",
              }}
            >
              {whyChooseUsData?.map((item, index) => {
                return (
                  <InsuranceBenefitCard
                    icon={item?.icon}
                    title={item?.title}
                    description={item?.description}
                    whyChooseUsData={true}
                  />
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ pr: { xs: 2 }, mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            flexWrap: "wrap",
          }}
        >
          {cardData?.map((item, index) => {
            return (
              <InsuranceBenefitCard
                icon={item?.icon}
                title={item?.title}
                description={item?.description}
              />
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default InsurancePolicy;
