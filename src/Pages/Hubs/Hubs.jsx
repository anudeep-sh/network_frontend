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

const Hubs = ({ setActiveSideBar }) => {
  const [member, setMember] = useState({ shortcode: "", level: 4 });
  const [hubsData, setHubsData] = useState([]);

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
console.log(updatedHubsData)
      setHubsData(updatedHubsData); // Update the state with the new data
    } catch (error) {
      console.log(error);
    }
  };

 
  useEffect(() => {
    handleGetHubs();
  }, []);
  const handleSubmit = async () => {
    try {
      const data = await hub.addMember(member.shortcode, member.level);
      alert("successfully joined");
    } catch (error) {
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
  console.log(member, "member");
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
      height={"100vh"}
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
          mt: 3,
          width: "25%",
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
          {/* <FormControl
            sx={{
              mt: 3,
              width: "100%",
              "& .MuiInputLabel-root": { color: "#F2F2F7" }, // Label color
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#6A6B6E", // Border color
                },
              },
              "& .MuiSelect-root": { color: "#F2F2F7" }, // Text color
            }}
            size="small"
          >
            <InputLabel>Level</InputLabel>
            <Select value={member.level} onChange={handleLevelChange}>
              <MenuItem value={1}>Level 1</MenuItem>
              <MenuItem value={2}>Level 2</MenuItem>
              <MenuItem value={3}>Level 3</MenuItem>
              <MenuItem value={4}>Level 4</MenuItem>
            </Select>
          </FormControl> */}
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
            sx={{ width: "100%" }}
            onClick={handleSubmit}
          >
            Join
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Hubs;
