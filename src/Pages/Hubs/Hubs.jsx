import React, { useEffect, useState } from "react";
import { SideBarWidth } from "../../utils/SideBarWidth";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Button,
} from "@mui/material";

import DashBoardWidget from "../../Components/Widget/DashboardWidget";
import level1 from "../../Assets/Images/hubs/level1.svg";
import level2 from "../../Assets/Images/hubs/level2.svg";
import level3 from "../../Assets/Images/hubs/level3.svg";
import level4 from "../../Assets/Images/hubs/level4.svg";
import level5 from "../../Assets/Images/hubs/level5.svg";
import InputBox from "../../Components/InputBox";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import { hub } from "../../api/requests/hubs/hubs";
import { ReactComponent as UserIcon } from "../../Assets/Images/person.svg";
import { Colors } from "../../Theme/Theme";

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
    5: level5,
  };

  const handleGetHubs = async () => {
    try {
      const response = await hub.getHubs();
      const values = [9200, 5800, 4300, 2600, 1500];
      const updatedHubsData = response.levels.map((level,index) => ({
        icon: levelImages[level.level], 
        title: level.name.replace(/_/g, " "), 
        value: `Rs. ${Number(level.price)}+500`, 
      }));
      setHubsData(updatedHubsData);
    } catch (error) {
    }
  };

  const getQuotas = async () => {
    try {
      const data = await hub.getQuotas();
      setQuotaData(data?.quota);
      setUserHubInfo(data?.userInfo);
    } catch (error) {
      alert(error?.response?.data);
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
            backgroundColor: "#ffffff",
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
          <Box sx={{width:'100%',mb:{xs:2}}}>
          <Typography
            sx={{
              fontSize: "18px",
              color: Colors.primaryTextColor,
              fontWeight: "700",
              textAlign: "left",
              mb:{xs:2}
            }}
          >
            Add Member
          </Typography>
          <Divider sx={{borderColor:Colors.dividerColor}}/>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              width:'100%'
            }}
          >
            <InputBox
              usingInDarkMode={false}
              label="Shortcode"
              placeholder={"Enter your shortcode"}
              type="number"
              value={member.shortcode}
              required={true}
              onChange={(e) => handleShortcodeChange(e.target.value)}
            />
            <CustomSelect
              usingInDarkMode={false}
              label="Select Level"
              value={member.level}
              onChange={handleLevelChange}
              required={true}
              options={[
                { value: 1, label: "Level 1" },
                { value: 2, label: "Level 2" },
                { value: 3, label: "Level 3" },
                { value: 4, label: "Level 4" },
                { value: 5, label: "Level 5" },
              ]}
            />
            <Button
              variant="contained"
              sx={{
                mt:2,
                backgroundColor: Colors.primary,
                color: Colors.white,
                "&:hover": {
                  backgroundColor: Colors.hoverColorBtn,
                },
              }}
              onClick={handleSubmit}
              fullWidth
            >
              Join
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "#ffffff",
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
          <Box sx={{width:'100%',mb:{xs:2}}}><Typography
            sx={{
              fontSize: "18px",
              color: Colors.primaryTextColor,
              fontWeight: "700",
              textAlign: "left",
              mb:{xs:2}
            }}
          >
            Quotas Available
          </Typography>
          <Divider sx={{borderColor:Colors.dividerColor}}/>
          </Box>
          <Box
            sx={{
              p: 2,
              width: "-webkit-fill-available",
              border: `1px solid ${Colors.dividerColor}`,
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
                      color: "#3C3C3C",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        letterSpacing: "1%",
                        lineHeight: 1.3,
                        mb: 0.5,
                        fontWeight: "600",
                        color:Colors.primaryTextColor,
                        fontSize: {
                          xs: "18px",
                          
                        },
                      }}
                    >
                      {quotaData?.name}
                    </Typography>

                    <Typography
                      component="span"
                      sx={{
                        letterSpacing: "1%",
                        fontWeight: "500",
                        color:Colors.secondaryColor,
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
                      color: "#3C3C3C",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        letterSpacing: "1%",
                        fontWeight: "400",
                        lineHeight: 1.4,
                        color:Colors.secondaryColor,
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
                <Typography sx={{ fontSize: "16px", color: "#797979" }}>
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
              borderRadius: 2,
              color: Colors.primaryTextColor,
              border: `1px solid ${Colors.dividerColor}`,
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
              borderRadius: 2,
              color: Colors.primaryTextColor,
              border: `1px solid ${Colors.dividerColor}`,
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
              borderRadius: 2,
              color: Colors.primaryTextColor,
              border: `1px solid ${Colors.dividerColor}`,
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
              borderRadius: 2,
              color: Colors.primaryTextColor,
              border: `1px solid ${Colors.dividerColor}`,
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
          <Box
            sx={{
              mt: 1,
              p: 1,
              width: "-webkit-fill-available",
              borderRadius: 2,
              color: Colors.primaryTextColor,
              border: `1px solid ${Colors.dividerColor}`,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              LEVEL 5
            </Typography>
            <Typography sx={{ fontSize: "16px", textAlign: "left" }}>
              Quotas : {quotaData?.level5_quota}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#ffffff",
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
                    <Box sx={{width:'100%',mb:{xs:2}}}>

          <Typography
            sx={{
              fontSize: "18px",
              color: Colors.primaryTextColor,
              fontWeight: "700",
              textAlign: "left",
              mb:{xs:2}
            }}
          >
            Your Info
          </Typography>
          <Divider sx={{borderColor:Colors.dividerColor}}/>

          </Box>
          <Box
            sx={{
              p: 1,
              px: 2,
              width: "-webkit-fill-available",
              borderRadius: 2,
              color: Colors.primaryTextColor,
              border: `1px solid ${Colors.dividerColor}`,
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
              borderRadius: 2,
              color: Colors.primaryTextColor,
              border: `1px solid ${Colors.dividerColor}`,
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
