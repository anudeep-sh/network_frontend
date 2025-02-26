import React from "react";
import { useEffect, useState } from "react";
import { Forms } from "../../api/requests/Forms";
import LogoUrl from "../../Assets/Images/networkLogo.png";
import heroImage from "../../Assets/Images/hospital/HeroImg.webp";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Colors } from "../../Theme/Theme";
import GetValidatedTokenData from "../../utils/helper";
import { FormOption } from "../../api/requests/FormOptions";

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

const StyledFormControl = styled(FormControl)(({ theme }) => ({
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

function HomeLoan() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    country: "",
    address: "",
    city: "",
    zip: "",
  });
  const [formOptions, setFormOptions] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allowedFields = [
      "first_name",
      "last_name",
      "email",
      "phone_number",
      "date_of_birth",
      "country",
      "address",
      "type",
    ];

    const directFields = {};
    const userinfoMeta = {};

    Object.keys(formData).forEach((key) => {
      if (allowedFields.includes(key)) {
        directFields[key] = formData[key];
      } else {
        userinfoMeta[key] = formData[key];
      }
    });

    const payload = {
      ...directFields,
      type: "home_loan",
      consents_meta: {
        marketing_emails: true,
      },
      userinfo_meta: {
        ...userinfoMeta,
        preferred_language: "en",
        timezone: "UTC-5",
      },
      form_meta: {
        source: "web",
        campaign: "spring2024",
      },
    };

    try {
      const response = await Forms.createFormUser(payload);
      alert(response?.message || "Something went wrong. Please try again.");
    } catch (error) {
      alert("Error submitting form.");
    } finally {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        date_of_birth: "",
        country: "",
        address: "",
        city: "",
        zip: "",
      });
    }
  };

  const getFormOptionsFields = async (fieldName) => {
    try {
      const { data } = await FormOption.getFormOptions(fieldName);
      if (data?.length > 0) {
        const updatedOptions = {};
        data?.forEach((item) => {
          updatedOptions[item?.form_field] = item?.options?.values || [];
        });

        setFormOptions((prevOptions) => ({
          ...prevOptions,
          ...updatedOptions,
        }));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getFormOptionsFields("home_loan");
  }, []);
  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          m: 0,
          backgroundColor: "#ffffff",
          py: { xs: 2, md: 2 },
          px: { xs: 2, md: 2 },
        }}
        alignItems="flex-start"
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            textAlign: "left",
            alignContent: "center",
            mb: { xs: 4, md: 0 },
            pr: { md: 2 },
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
            Home Loan Hub: Turn Your Dream Home into Reality{" "}
          </Typography>
          <Typography
            className={"poppins-font"}
            variant="subtitle2"
            sx={{}}
            color={Colors.secondaryColor}
          >
            Secure affordable financing for your dream home with our flexible
            home loan options. Enjoy competitive rates, easy approvals, and
            tailored repayment plans to suit your needs.
          </Typography>

          <Grid
            item
            md={9}
            sx={{
              alignContent: "center",
              display: { xs: "none", md: "block" },
            }}
          >
            <img
              src={heroImage}
              alt="HeroImage"
              height={"100%"}
              width={"100%"}
              style={{ objectFit: "contain", marginBottom: "0px" }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sx={{ pr: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} textAlign={"left"}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" gutterBottom display={"block"}>
                  First Name
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  name="first_name"
                  required
                  value={formData?.first_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" gutterBottom display={"block"}>
                  Last Name
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  name="last_name"
                  required
                  value={formData?.last_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" gutterBottom display={"block"}>
                  Email
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  name="email"
                  type="email"
                  required
                  value={formData?.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" gutterBottom display={"block"}>
                  Phone Number
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  name="phone_number"
                  type="number"
                  required
                  value={formData?.phone_number}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" gutterBottom display={"block"}>
                  Date of Birth
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  name="date_of_birth"
                  type="date"
                  required
                  value={formData?.date_of_birth}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  Country
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  name="country"
                  required
                  value={formData?.country}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  City
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  name="city"
                  required
                  value={formData?.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  Zip / Postal Code
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  name="zip"
                  type="text"
                  required
                  value={formData?.zip}
                  onChange={handleChange}
                  inputProps={{
                    maxLength: 6,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  Address
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  name="address"
                  required
                  value={formData?.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: Colors.primary,
                    color: Colors.white,
                    "&:hover": {
                      backgroundColor: Colors.hoverColorBtn,
                    },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeLoan;
