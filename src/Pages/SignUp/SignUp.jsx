import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import InputBox from "../../Components/InputBox";
import CustomButton from "../../Components/Button/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import FileUpload from "../../Components/FileUpload/FileUpload";
import { SignupInputFields } from "../../utils/SignUpFields";
import Logo from "../../Assets/Images/networkLogo.png";
import { UserAuthApi } from "../../api/requests/userAuth/userAuthApi";
import { handleAlert } from "../../utils/handleAlert";
import { Colors } from "../../Theme/Theme";

const SignUp = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let hasError = false;

    if (!username) {
      setUsernameError(true);
      hasError = true;
    } else {
      setUsernameError(false);
    }

    if (!email.match(emailRegex)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

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
        const data = await UserAuthApi.signup(username, email, password);
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
              "This phone Number hasn't been registered try signing up",
              "error"
            );
          }
        }
      } catch (error) {
        handleAlert("error", error.message);
        setLoading(false);
      }
    } else {
      handleAlert("Please fill all the required fields", "warning");
    }
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

  const handleUserNameChange = (value) => {
    setUsername(value);
    if (value) {
      setUsernameError(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
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
        height={isMediumScreen ? "90vh" : "80vh"}
        padding={isMediumScreen ? "20px 40px" : "48px"}
        sx={{
          boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)",
        }}
        borderRadius={2}
        bgcolor="background.paper"
        width={isSmallScreen ? "80vw" : "420px"}
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
                <Typography fontSize={"20px"} className={"poppins-font"} sx={{color:Colors.primaryTextColor}}>Network</Typography>
              </Box>
            )}
            <Typography variant="h5" gutterBottom className={"poppins-font"} color={Colors.primaryTextColor} sx={{fontWeight:500}}>
              Sign up
            </Typography>
            <Box mt={1} mb={"70px"}>
              <Typography variant="body2" className={"poppins-font"} color={Colors.primaryTextColor}>
                Already have an account?{" "}
                <Link
                  to={"/signin"}
                  color="primary"
                  style={{
                    textDecoration: "none",
                    color: Colors.primary,
                  }}
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
            <InputBox
              label="Username"
              placeholder={"Enter username"}
              type="text"
              value={username}
              required={true}
              onChange={(e) => handleUserNameChange(e.target.value)}
              error={usernameError}
              helperText={
                usernameError && username === ""
                  ? "username is required"
                  : usernameError && "Enter a valid Phone Number"
              }
            />
            <InputBox
              label="Phone Number"
              placeholder={"Enter your Phone Number"}
              type="text"
              value={email}
              required={true}
              onChange={(e) => handleEmailChange(e.target.value)}
              error={emailError}
              helperText={
                emailError && email === ""
                  ? "Phone Number is required"
                  : emailError && "Enter a valid phone Number"
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
            justifyContent={"flex-end"}
            alignItems={"center"}
            width={"100%"}
            height={"fit-content"}
          >
            <Box width="fit-content">
              <CustomButton onClick={handleSubmit} borderRadius={"8px"}  customStyles={{
                  backgroundColor: Colors.primary,
                  color: Colors.white,
                  "&:hover": {
                    backgroundColor: Colors.hoverColorBtn,
                  },
                }}>
                Sign up
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
