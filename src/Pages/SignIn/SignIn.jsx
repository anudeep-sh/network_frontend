import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Logo from "../../Assets/Images/networkLogo.png";
import InputBox from "../../Components/InputBox";
import CustomCheckbox from "../../Components/CustomCheckBox/CustomCheckBox";
import CustomButton from "../../Components/Button/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { UserAuthApi } from "../../api/requests/userAuth/userAuthApi";
import { handleAlert } from "../../utils/handleAlert";
import { Colors } from "../../Theme/Theme";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSignIn = async () => {
    let hasError = false;

    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // if (!email.match(emailRegex)) {
    //   setEmailError(true);
    //   return;
    // } else {
    //   setEmailError(false);
    // }

    if (!email) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (!hasError) {
      try {
        setLoading(true);
        const data = await UserAuthApi.login(email, password);
        const Token = data?.token;
        if (Token) {
          localStorage.setItem("Token", Token);
          localStorage.setItem("Role", data?.role);
          localStorage.setItem("user_details", JSON.stringify(data?.user));
          handleAlert(data?.msg, "success");
          navigate("/dashboard");
        } else {
          if (data.msg === "Incorrect Password") {
            setLoading(false);
            handleAlert(data?.msg, "error");
          } else if (data.msg === "please verify by the link you get in mail") {
            setLoading(false);
            handleAlert(data?.msg, "error");
          } else if (data?.msg === "please signUp first") {
            setLoading(false);
            handleAlert(
              "This email hasn't been registered try signing up",
              "error"
            );
          }
        }
      } catch (err) {
        setLoading(false);
        handleAlert(err?.message, "error");
      }
    } else {
      handleAlert("Error in form", "warning");
    }
    setLoading(false);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (value) {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (value) {
      setPasswordError(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: isMediumScreen ? "center" : "space-between",
        gap: isMediumScreen && "20px",
        flexDirection: isMediumScreen ? "column" : "row",
        // backgroundImage: `url("https://source.unsplash.com/1600x900/?nature,water")`,
      }}
    >
      <Box
        display={isMediumScreen ? "none" : "flex"}
        gap={"8px"}
        alignItems={"flex-start"}
        flexDirection={"column"}
        marginLeft={isMediumScreen ? "0px" : "60px"}
      >
        <Box display={"flex"} gap={"8px"} alignItems={"center"}>
          <img src={Logo} alt="Network Logo" height={40} width={40} />
          <Typography
            fontSize={"30px"}
            color={Colors.primaryTextColor}
            fontWeight={"600"}
            className={"poppins-font"}
          >
            Fi Wallet
          </Typography>
        </Box>
        <Typography
          fontSize={"16px"}
          color={Colors.primaryTextColor}
          className={"poppins-font"}
        >
          Sign in or Create an account
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height={isMediumScreen ? "90vh" : "70vh"}
        padding={isMediumScreen ? "20px 40px" : "48px"}
        // boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"
        width={isSmallScreen ? "80vw" : "420px"}
        sx={{
          boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box
          height={"100%"}
          width={"100%"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          // sx={{
          //   backgroundColor: "orange",
          // }}
        >
          <Box width={"100%"} textAlign={"start"}>
            {isMediumScreen && (
              <Box
                display={"flex"}
                gap={"8px"}
                alignItems={"center"}
                mb={"10px"}
              >
                <img src={Logo} alt="Network Logo" height={20} width={20} />
                <Typography fontSize={"20px"} className={"poppins-font"} sx={{color:Colors.primaryTextColor}}>
                  Network
                </Typography>
              </Box>
            )}
            <Typography variant="h5" gutterBottom className={"poppins-font"} sx={{color:Colors.primaryTextColor,fontWeight:500}}>
              Sign in
            </Typography>
            <Box mt={1} mb={"70px"}>
              <Typography variant="body2" className={"poppins-font"} sx={{color:Colors.primaryTextColor}}>
                New User?{" "}
                <Link
                  to={"/signup"}
                  color="primary"
                  style={{
                    textDecoration: "none",
                    color: Colors.primary,
                  }}
                >
                  Create an account
                </Link>
              </Typography>
            </Box>
            <InputBox
              label="Mobile Number"
              placeholder={"Enter Your Mobile Number"}
              type="text"
              value={email}
              required={true}
              onChange={(e) => handleEmailChange(e.target.value)}
              error={emailError}
              helperText={
                emailError && email === ""
                  ? "Email is required"
                  : emailError && "Enter a valid email"
              }
            />
            <InputBox
              label="Password"
              placeholder={"Enter your password"}
              type="password"
              value={password}
              required={true}
              onChange={(e) => handlePasswordChange(e.target.value)}
              showPasswordToggle
              error={passwordError}
              helperText={passwordError && "Password is required"}
              onKeyDown={handleKeyDown}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            width={"100%"}
            height={"fit-content"}
            justifyContent={"flex-end"}
          >
            {/* <FormControlLabel
              control={
                <Switch
                  checked={staySignedIn}
                  onChange={(e) => setStaySignedIn(e.target.checked)}
                  color="primary"
                />
              }
              label="Stay signed in"
            /> */}
            <Box width="fit-content" display={"flex"}>
              <CustomButton
                onClick={handleSignIn}
                borderRadius={"8px"}
                customStyles={{
                  backgroundColor: Colors.primary,
                  color: Colors.white,
                  "&:hover": {
                    backgroundColor: Colors.hoverColorBtn,
                  },
                }}
              >
                Log in
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
