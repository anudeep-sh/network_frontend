import React, { useEffect, useState } from "react";
import { SideBarWidth } from "../../utils/SideBarWidth";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import DashBoardWidget from "../../Components/Widget/DashboardWidget";
import level1 from "../../Assets/Images/hubs/level1.svg";
import level2 from "../../Assets/Images/hubs/level2.svg";
import level3 from "../../Assets/Images/hubs/level3.svg";
import level4 from "../../Assets/Images/hubs/level4.svg";
import InputBox from "../../Components/InputBox";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import { hub } from "../../api/requests/hubs/hubs";
import { ReactComponent as UserIcon } from "../../Assets/Images/person.svg";
const Hubs = ({ setActiveSideBar }) => {
  const [member, setMember] = useState({ shortcode: "", level: 4 });
  const [hubsData, setHubsData] = useState([]);
  const [quotaData, setQuotaData] = useState(null);
  const [userHubInfo, setUserHubInfo] = useState(null);

  // Mapping of level to corresponding images
  const levelImages = {
    1: level1,
    2: level2,
    3: level3,
    4: level4,
  };

  const handleGetHubs = async () => {
    try {
      const response = await hub.getHubs();

      // Map backend data to include the corresponding image
      const updatedHubsData = response.levels.map((level) => ({
        icon: levelImages[level.level], // Get the image based on the level
        title: level.name.replace(/_/g, " "), // Replacing underscores with spaces for better readability
        value: `Rs. ${level.price}`, // Formatting price with 'Rs.'
      }));
      setHubsData(updatedHubsData);
    } catch (error) {
      console.log(error);
    }
  };

  const getQuotas = async () => {
    try {
      const data = await hub.getQuotas();
      setQuotaData(data?.quota);
      setUserHubInfo(data?.userInfo);
    } catch (error) {
      alert(error?.response?.data);
      console.log(error, "cool");
    }
  };

  useEffect(() => {
    handleGetHubs();
    getQuotas();
  }, []);
  const handleSubmit = async () => {
    try {
      const data = await hub.addMember(member.shortcode, member.level);
      alert("successfully joined");
      getQuotas();
    } catch (error) {
      alert(error?.response?.data);
      console.log(error);
    }
  };

  // Function to update the shortcode and level
  const updateMember = (newShortcode, newLevel) => {
    setMember((prevMember) => ({
      ...prevMember,
      shortcode: newShortcode,
      level: newLevel,
    }));
  };

  // Function to handle shortcode input change
  const handleShortcodeChange = (newShortcode) => {
    updateMember(newShortcode, member.level);
  };

  // Function to handle level selection change
  const handleLevelChange = (event) => {
    const newLevel = parseInt(event.target.value, 10); // Parse the selected value as an integer
    updateMember(member.shortcode, newLevel);
  };


  return (
    <Box
      marginLeft={{
        md: `${SideBarWidth}px`,
      }}
      onClick={() => {
        setActiveSideBar(false);
      }}
      sx={{
        width: {
          xs: "100%",
          md: `calc(100% - ${SideBarWidth}px)`,
        },
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "0px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#2a2a3c",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#1e1e2d",
        },
      }}
      // height={"100dvh"}
      //  minHeight="100vh"
      //  height="100%" overflow="auto"
    >
      <Box
        height={"fit-content"}
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mr: { xs: 2, md: 3 },
          ml: { xs: 2, md: 3 },
        }}
      >
        {hubsData?.map((element, index) => (
          <DashBoardWidget
            key={index}
            icon={element.icon}
            title={element.title}
            value={element.value}
            hubs={true}
          />
        ))}
      </Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Box
          sx={{
            backgroundColor: "#2C2C2E",
            padding: {
              xs: "12px 16px 12px 16px",
              sm: "16px 20px 16px 20px",
            },
            borderRadius: "8px",
            height: { xs: "max-content", md: "auto" },
            display: "flex",
            alignItems: "baseline",
            justifyContent: "flex-start",
            flexDirection: "column",
            mr: { xs: 2, md: 0 },
            ml: { xs: 2, md: 3 },
            mt: 3,
            width: { xs: "-webkit-fill-available", md: "25%" },
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              color: "#F2F2F7",
              fontWeight: "500",
              textAlign: "left",
              mb: 3,
            }}
          >
            Add Member
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <InputBox
              usingInDarkMode={true}
              label="Shortcode"
              placeholder={"Enter your shortcode"}
              type="number"
              value={member.shortcode}
              required={true}
              onChange={(e) => handleShortcodeChange(e.target.value)}
            />
            <CustomSelect
              usingInDarkMode={true}
              label="Select Level"
              value={member.level}
              onChange={handleLevelChange}
              required={true}
              options={[
                { value: 1, label: "Level 1" },
                { value: 2, label: "Level 2" },
                { value: 3, label: "Level 3" },
                { value: 4, label: "Level 4" },
              ]}
            />
            <Button
              variant="contained"
              sx={{ width: "100%", mt: 2 }}
              onClick={handleSubmit}
            >
              Join
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "#2C2C2E",
            padding: {
              xs: "12px 16px 12px 16px",
              sm: "16px 20px 16px 20px",
            },
            borderRadius: "8px",
            height: "max-content",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "flex-start",
            flexDirection: "column",
            mr: { xs: 2, md: 3 },
            ml: { xs: 2, md: 3 },
            mb: { xs: 0, md: 0 },
            mt: 3,
            width: { xs: "-webkit-fill-available", md: "40%" },
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              color: "#F2F2F7",
              fontWeight: "500",
              textAlign: "left",
              mb: 3,
            }}
          >
            Quotas Available
          </Typography>
          <Box
            sx={{
              p: 2,
              width: "-webkit-fill-available",
              bgcolor: "#262626",
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <UserIcon height={"40px"} width={"40px"} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  gap: 1,
                  width: "-webkit-fill-available",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "-webkit-fill-available",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      color: "#fff",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        letterSpacing: "1%",
                        lineHeight: 1.3,
                        mb: 1,
                        fontWeight: "600",
                        fontSize: {
                          xs: "18px",
                          sm: "20px",
                        },
                      }}
                    >
                      {quotaData?.name}
                    </Typography>

                    <Typography
                      component="span"
                      sx={{
                        letterSpacing: "1%",
                        fontWeight: "400",
                        fontSize: {
                          xs: "12px",
                          sm: "14px",
                        },
                      }}
                    >
                      {quotaData?.shortcode}{" "}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      color: "#fff",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        letterSpacing: "1%",
                        fontWeight: "400",
                        lineHeight: 1.4,
                        fontSize: {
                          xs: "12px",
                          sm: "14px",
                        },
                      }}
                    >
                      STATUS : {quotaData?.status}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontSize: "16px", color: "#f2f2f5" }}>
                  {quotaData?.emailId}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 2,
              p: 1,
              width: "-webkit-fill-available",
              bgcolor: "#262626",
              borderRadius: 2,
              color: "#f9f9f9",
              borderBottom: "1px solid #333333",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              LEVEL 1
            </Typography>
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              Quotas : {quotaData?.level1_quota}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 1,
              p: 1,
              width: "-webkit-fill-available",
              bgcolor: "#262626",
              borderRadius: 2,
              color: "#f9f9f9",
              borderBottom: "1px solid #333333",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              LEVEL 2
            </Typography>
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              Quotas : {quotaData?.level2_quota}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 1,
              p: 1,
              width: "-webkit-fill-available",
              bgcolor: "#262626",
              borderRadius: 2,
              color: "#f9f9f9",
              borderBottom: "1px solid #333333",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              LEVEL 3
            </Typography>
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              Quotas : {quotaData?.level3_quota}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 1,
              p: 1,
              width: "-webkit-fill-available",
              bgcolor: "#262626",
              borderRadius: 2,
              color: "#f9f9f9",
              borderBottom: "1px solid #333333",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              LEVEL 4
            </Typography>
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              Quotas : {quotaData?.level4_quota}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#2C2C2E",
            padding: {
              xs: "12px 16px 12px 16px",
              sm: "16px 20px 16px 20px",
            },
            borderRadius: "8px",
            height: "max-content",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "flex-start",
            flexDirection: "column",
            mr: { xs: 2, md: 3 },
            ml: { xs: 2, md: 0 },
            mb: { xs: 3, md: 0 },
            mt: 3,
            width: { xs: "-webkit-fill-available", md: "25%" },
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              color: "#F2F2F7",
              fontWeight: "500",
              textAlign: "left",
              mb: 3,
            }}
          >
            Your Info
          </Typography>
          <Box
            sx={{
              p: 1,
              px: 2,
              width: "-webkit-fill-available",
              bgcolor: "#262626",
              borderRadius: 2,
              color: "#f9f9f9",
              borderBottom: "1px solid #333333",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              Joined Hub
            </Typography>
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              {userHubInfo?.name}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              mt: 1,
              px: 2,
              width: "-webkit-fill-available",
              bgcolor: "#262626",
              borderRadius: 2,
              color: "#f9f9f9",
              borderBottom: "1px solid #333333",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              Current Level
            </Typography>
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              {userHubInfo?.level}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hubs;
