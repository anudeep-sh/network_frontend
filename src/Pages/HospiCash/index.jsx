import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Box,
  Select,
} from "@mui/material";

import { SideBarWidth } from "../../utils/SideBarWidth";
import { Colors } from "../../Theme/Theme";
import LogoUrl from "../../Assets/Images/networkLogo.png";
import styled from "@emotion/styled";
import { Forms } from "../../api/requests/Forms";
import { FormOption } from "../../api/requests/FormOptions";
import GetValidatedTokenData from "../../utils/helper";
import heroImage from "../../Assets/Images/hospital/HeroImg.webp";
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

const HospiCash = () => {
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
    gender: "",
    shortcode: "",
    hospital: "",
    medication: "",
    hospitalization: "",
    issue: "",
    budget: "",
    insurance: "",
    date_of_admitting: "",
    terms_accepted: false,
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
      type: "hospital_cash",
      consents_meta: {
        marketing_emails: true,
        terms_accepted: formData?.terms_accepted,
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
      if (response?.message) {
        alert(response?.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
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
        gender: "",
        shortcode: "",
        hospital: "",
        medication: "",
        hospitalization: "",
        issue: "",
        budget: "",
        insurance: "",
        date_of_admitting: "",
        terms_accepted: false,
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
    const response = GetValidatedTokenData();

    if (response?.userPayload?.shortcode) {
      setFormData((prevState) => ({
        ...prevState,
        shortcode: response?.userPayload?.shortcode,
      }));
    }

    getFormOptionsFields("hospital_cash");
  }, []);

  return (
    <Box sx={{ p: 2 }}>
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
          py: { xs: 3, md: 2 },
          px: { xs: 2, md: 2 },
          backgroundColor: "#ffffff",
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
            HOSPICASH WALLET: Secure Your Health and Finances
          </Typography>
          <Typography
            className={"poppins-font"}
            variant="subtitle2"
            sx={{}}
            color={Colors.secondaryColor}
          >
            Financial Services Designed to Safeguard Your Health and Achieve
            Your Financial Goals.
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
                <Typography variant="caption" display="block" gutterBottom>
                  First Name
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  value={formData?.first_name}
                  name="first_name"
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  Last Name
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  value={formData?.last_name}
                  name="last_name"
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  Email
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  name="email"
                  type="email"
                  value={formData?.email}
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  Phone Number
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  type="number"
                  name="phone_number"
                  required
                  value={formData?.phone_number}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" display="block" gutterBottom>
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
                  InputLabelProps={{ shrink: true }}
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
              <Grid item xs={12}>
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
              <Grid item xs={12} md={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  Gender
                </Typography>
                <RadioGroup
                  row
                  name="gender"
                  onChange={handleChange}
                  value={formData?.gender}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  Select Hospital
                </Typography>
                <StyledFormControl fullWidth>
                  <Select
                    size="small"
                    fullWidth
                    select
                    name="hospital"
                    onChange={handleChange}
                    value={formData?.hospital}
                    displayEmpty
                  >
                    <MenuItem value={""}>{"Select Hospital"}</MenuItem>
                    {formOptions?.hospital_cash?.map((option) => (
                      <MenuItem key={option.value} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledFormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  Are you on Medication?
                </Typography>
                <RadioGroup
                  row
                  name="medication"
                  onChange={handleChange}
                  value={formData?.medication}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms_accepted"
                      onChange={handleCheckboxChange}
                      checked={formData?.terms_accepted}
                    />
                  }
                  label="I accept the Terms and Conditions"
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
};

export default HospiCash;
