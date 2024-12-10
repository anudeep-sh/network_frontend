import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { SideBarWidth } from "../../utils/SideBarWidth";
import { useEffect, useState } from "react";
import { hub } from "../../api/requests/hubs/hubs";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";

export default function UserQuotas({ setActiveSideBar }) {
  const [quotaData, setQuotaData] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedQuota, setSelectedQuota] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const getQuotas = async () => {
    try {
      const data = await hub.getQuota();
      setQuotaData(data.quotas);
    } catch (error) {
      alert(error?.response?.data);
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getQuotas();
  }, []);

  const handleLevelChange = (e) => {
    const level = e.target.value;
    setSelectedLevel(level);
    if (selectedQuota) {
      const quotaValue = selectedQuota[`level${level}_quota`];

      // Only set an empty string if the quotaValue is explicitly undefined or null
      setInputValue(
        quotaValue !== undefined && quotaValue !== null ? quotaValue : ""
      );
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = async () => {
    if (selectedQuota && selectedLevel) {
      try {
        await hub.postQuota({
          userId: selectedQuota.id,
          quota: inputValue,
          level: selectedLevel,
        });
        alert("Quota updated successfully!");
        // Optionally, update the state with the new quota value
        setQuotaData((prevData) =>
          prevData.map((quota) =>
            quota.id === selectedQuota.id
              ? { ...quota, [`level${selectedLevel}_quota`]: inputValue }
              : quota
          )
        );
        setSelectedQuota(null);
        setInputValue("");
      } catch (error) {
        console.log(error, "error");
        alert("Failed to update quota");
      }
    } else {
      alert("Please select a level and enter a quota value before saving.");
    }
  };

  const handleEdit = (quota) => {
    setSelectedQuota(quota);
    setSelectedLevel(1); // Default to Level 1
    setInputValue(quota.level1_quota); // Set the input to Level 1 quota by default
  };

  return (
    <Box
      marginLeft={{
        md: `${SideBarWidth}px`,
      }}
      // onClick={() => {
      //   setActiveSideBar(false);
      // }}
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
    >
      <Box sx={{ p: 3 }}>
        <Box
          bgcolor={"#ffffff"}
          mb={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 1,
            padding: {
              xs: "12px 16px 12px 16px",
              sm: "16px 20px 16px 20px",
            },
          }}
        >
          {selectedQuota?.name && (
            <Typography
              sx={{
                fontSize: "18px",
                color: "#3C3C3C",
                fontWeight: "500",
                textAlign: "left",
                mb: 2,
              }}
            >
              {selectedQuota?.name}
            </Typography>
          )}

          <Box sx={{ display: "flex", gap: 2, mb: 0 }}>
            <CustomSelect
              usingInDarkMode={false}
              value={selectedLevel}
              onChange={handleLevelChange}
              required={true}
              disabled={!selectedQuota}
              mb={false}
              options={[
                { value: 1, label: "Level 1" },
                { value: 2, label: "Level 2" },
                { value: 3, label: "Level 3" },
                { value: 4, label: "Level 4" },
              ]}
            />
            <TextField
              variant="outlined"
              size="small"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#3C3C3C", // Text color
                  "& fieldset": {
                    borderColor: "#3C3C3C",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3C3C3C",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3C3C3C",
                  },
                },
                "&.Mui-disabled": {
                  color: "#9e9e9e", // Text color when disabled
                  "& fieldset": {
                    borderColor: "#9e9e9e", // Border color when disabled
                  },
                  backgroundColor: "#e0e0e0", // Background color when disabled
                },
                width: "300px",
                color: "#3C3C3C",
                borderRadius: "4px",
              }}
              disabled={!selectedQuota} // Disable if no quota is selected
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                height: "max-content",
                "&.Mui-disabled": {
                  bgcolor: "#d3d3d3", // Color when disabled
                  color: "#9e9e9e", // Text color when disabled
                  boxShadow: "none", // Remove shadow when disabled
                },
              }}
              onClick={handleSave}
              disabled={!selectedQuota} // Disable if no quota is selected
            >
              Save
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
            height: { xs: "max-content", md: "auto" },
            mt: 3,
            width: { xs: "-webkit-fill-available" },
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              color: "#3C3C3C",
              fontWeight: "500",
              textAlign: "left",
              mb: 2,
            }}
          >
            Quotas Available
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ bgcolor: "#f3f4f8" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#3C3C3C" }}>Name</TableCell>
                  <TableCell sx={{ color: "#3C3C3C" }}>shortcode</TableCell>
                  <TableCell sx={{ color: "#3C3C3C" }}>Email</TableCell>
                  <TableCell sx={{ color: "#3C3C3C" }}>Quota1</TableCell>
                  <TableCell sx={{ color: "#3C3C3C" }}>Quota2</TableCell>
                  <TableCell sx={{ color: "#3C3C3C" }}>Quota3</TableCell>
                  <TableCell sx={{ color: "#3C3C3C" }}>Quota4</TableCell>
                  <TableCell sx={{ color: "#3C3C3C" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quotaData.map((quota) => (
                  <TableRow key={quota.id}>
                    <TableCell sx={{ color: "#3C3C3C" }}>
                      {quota.name}
                    </TableCell>
                    <TableCell sx={{ color: "#3C3C3C" }}>
                      {quota.shortcode}
                    </TableCell>
                    <TableCell sx={{ color: "#3C3C3C" }}>
                      {quota.emailId}
                    </TableCell>
                    <TableCell sx={{ color: "#3C3C3C" }}>
                      {quota.level1_quota}
                    </TableCell>
                    <TableCell sx={{ color: "#3C3C3C" }}>
                      {quota.level2_quota}
                    </TableCell>
                    <TableCell sx={{ color: "#3C3C3C" }}>
                      {quota.level3_quota}
                    </TableCell>
                    <TableCell sx={{ color: "#3C3C3C" }}>
                      {quota.level4_quota}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(quota)}
                        sx={{ bgcolor: "#ffffff" }}
                      >
                        <ModeEditOutlineOutlinedIcon
                          sx={{ color: "#3C3C3C" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
