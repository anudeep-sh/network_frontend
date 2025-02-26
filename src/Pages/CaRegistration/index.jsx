import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import heroImage from "../../Assets/Images/hospital/HeroImg.webp";
import LogoUrl from "../../Assets/Images/networkLogo.png";
import { Colors } from "../../Theme/Theme";
import styled from "@emotion/styled";
import { SideBarWidth } from "../../utils/SideBarWidth";
import GetValidatedTokenData from "../../utils/helper";
import { FormOption } from "../../api/requests/FormOptions";
import { Forms } from "../../api/requests/Forms";

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

const CaRegistration = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    company_name: "",
    address: "",
    business_type: "",
    select_option: "",
    shortcode: "",
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
      type: "ca_registration",
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
        company_name: "",
        address: "",
        business_type: "",
        select_option: "",
        shortcode: "",
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

    getFormOptionsFields("ca_registration");
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
            Register for Expert Chartered Accounting Services
          </Typography>
          <Typography
            className={"poppins-font"}
            variant="subtitle2"
            sx={{}}
            color={Colors.secondaryColor}
          >
            Get expert financial support with accurate accounting to help your
            business grow successfully.
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
                  Company name
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  name="company_name"
                  required
                  value={formData?.company_name}
                  onChange={handleChange}
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
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  Select Business type
                </Typography>
                <StyledFormControl fullWidth>
                  <Select
                    size="small"
                    fullWidth
                    select
                    name="business_type"
                    onChange={handleChange}
                    value={formData?.business_type}
                    displayEmpty
                  >
                    <MenuItem value={""}>{"Select Business type"}</MenuItem>
                    {formOptions?.business_type?.map((option) => (
                      <MenuItem key={option.value} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledFormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  Select Option
                </Typography>
                <StyledFormControl fullWidth>
                  <Select
                    size="small"
                    fullWidth
                    select
                    name="select_option"
                    onChange={handleChange}
                    value={formData?.select_option}
                    displayEmpty
                  >
                    <MenuItem value={""}>{"Select Option"}</MenuItem>
                    {formOptions?.select_option?.map((option) => (
                      <MenuItem key={option.value} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledFormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  Short Code
                </Typography>
                <StyledTextField
                  size="small"
                  fullWidth
                  name="shortcode"
                  required
                  value={formData?.shortcode}
                  onChange={handleChange}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms_accepted"
                      checked={formData.terms_accepted}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="I accept Terms and Conditions of Company"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
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

export default CaRegistration;
