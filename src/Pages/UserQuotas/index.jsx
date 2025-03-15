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
import { Colors } from "../../Theme/Theme";

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
          userId: selectedQuota.user_id,
          quota: inputValue,
          level: selectedLevel,
        });
        alert("Quota updated successfully!");
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
        alert("Failed to update quota");
      }
    } else {
      alert("Please select a level and enter a quota value before saving.");
    }
  };

  const handleEdit = (quota) => {
    setSelectedQuota(quota);
    setSelectedLevel(1);
    setInputValue(quota.level1_quota);
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
                { value: 5, label: "Level 5" },
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
                backgroundColor: Colors.primary,
                color: Colors.white,
                "&:hover": {
                  backgroundColor: Colors.hoverColorBtn,
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
          <TableContainer
            sx={{
              backgroundColor: Colors.white,
              border: `1px solid ${Colors.dividerColor}`,
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: Colors.primaryTextColor,
                fontWeight: "700",
                marginBottom: "16px",
                textAlign: "left",
                mt: 2,
                ml: 2,
              }}
            >
              Quotas Available
            </Typography>
            <Table sx={{ borderTop: `1px solid ${Colors.tableHeaderBorder}` }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    shortcode
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Referrer shortcode
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Referrer name
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Referrer email
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Quota1
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Quota2
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Quota3
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Quota4
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Quota5
                  </TableCell>
                  <TableCell
                    sx={{
                      color: Colors.primaryTextColor,
                      py: 1,
                      px: 2,
                      fontWeight: "600!important",
                      letterSpacing: "0.5px",
                      bgcolor: "#F9FBFC",
                      borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quotaData?.map((quota) => (
                  <TableRow
                    key={quota.id}
                    sx={{
                      "&:last-child td": { borderBottom: "none" }, // Removes bottom border for the last row
                    }}
                  >
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      {quota.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      {quota.shortcode}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      {quota.emailId}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                        minWidth: "160px",
                      }}
                    >
                      {quota.referrer_shortcode}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                        minWidth: "160px",
                      }}
                    >
                      {quota.referrer_name}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      {quota?.referrer_email}
                    </TableCell>

                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      {quota.level1_quota}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      {quota.level2_quota}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      {quota.level3_quota}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      {quota.level4_quota}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      {quota.level5_quota}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: Colors.primaryTextColor,
                        borderBottom: `1px solid ${Colors.dividerColor}`,
                      }}
                    >
                      <IconButton
                        onClick={() => handleEdit(quota)}
                        sx={{ bgcolor: Colors.BgColorLite }}
                      >
                        <ModeEditOutlineOutlinedIcon
                          sx={{ color: Colors.primary }}
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
