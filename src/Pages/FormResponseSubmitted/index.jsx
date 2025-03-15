import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Tabs,
  Tab,
  TablePagination,
  Chip
} from "@mui/material";
import { SideBarWidth } from "../../utils/SideBarWidth";
import { Colors } from "../../Theme/Theme";
import axios from "axios";

const formTypes = [
  "hospital_cash",
  "business_loan",
  "home_loan",
  "personal_loan",
  "ca_registration",
];

// Helper function to format field names
const formatFieldName = (field) => {
  return field
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper function to format field values
const formatFieldValue = (value) => {
  if (value === null || value === undefined) return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value instanceof Date) return value.toLocaleDateString();
  if (typeof value === "object") return JSON.stringify(value);
  return value.toString();
};

const FormResponseSubmitted = ({ setActiveSideBar }) => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(formTypes[0]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getFormResponses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("Token");
      const userDetails = localStorage.getItem("user_details");
      const userDetailsData = JSON.parse(userDetails);
      const shortcode = userDetailsData?.[0]?.shortcode;
      
      if (!token || !shortcode) {
        throw new Error("Authentication information missing");
      }

      const response = await axios.get(
        `https://network-backend-61566002034.us-central1.run.app/form/shortcode?shortcode=${shortcode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const filteredData = response.data.data.filter(item => item.type === selectedTab);
      setFormData(filteredData);
    } catch (error) {
      console.error("Error fetching form responses:", error);
      setError(error.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFormResponses();
  }, [selectedTab]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get all unique fields from the data
  const getAllFields = (data) => {
    const fields = new Set();
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (typeof item[key] === 'object' && item[key] !== null) {
          Object.keys(item[key]).forEach(nestedKey => {
            fields.add(`${key}.${nestedKey}`);
          });
        } else {
          fields.add(key);
        }
      });
    });
    return Array.from(fields);
  };

  // Get value from nested object using dot notation
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const fields = getAllFields(formData);

  return (
    <Box
      marginLeft={{
        md: `${SideBarWidth}px`,
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
      }}
    >
      <Box sx={{ p: 3 }}>
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
            Submitted Form Responses
          </Typography>

          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{ mb: 2 }}
          >
            {formTypes.map((type) => (
              <Tab
                key={type}
                label={type.replace(/_/g, " ").toUpperCase()}
                value={type}
              />
            ))}
          </Tabs>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Typography color="error" sx={{ textAlign: 'center', my: 2 }}>
              {error}
            </Typography>
          )}

          {!loading && !error && (
            <TableContainer
              sx={{
                backgroundColor: Colors.white,
                border: `1px solid ${Colors.dividerColor}`,
                borderRadius: "8px",
                overflowX: "auto"
              }}
            >
              <Table sx={{ borderTop: `1px solid ${Colors.tableHeaderBorder}` }}>
                <TableHead>
                  <TableRow>
                    {fields.map((field) => (
                      <TableCell
                        key={field}
                        sx={{
                          color: Colors.primaryTextColor,
                          py: 1,
                          px: 2,
                          fontWeight: "600!important",
                          bgcolor: "#F9FBFC",
                          borderBottom: `1px solid ${Colors.tableHeaderBorder}`,
                          whiteSpace: "nowrap"
                        }}
                      >
                        {formatFieldName(field)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={fields.length} sx={{ textAlign: 'center' }}>
                        No data found for this form type
                      </TableCell>
                    </TableRow>
                  ) : (
                    formData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((response) => (
                        <TableRow
                          key={response.id}
                          sx={{
                            "&:last-child td": { borderBottom: "none" },
                          }}
                        >
                          {fields.map((field) => (
                            <TableCell
                              key={`${response.id}-${field}`}
                              sx={{
                                color: Colors.primaryTextColor,
                                borderBottom: `1px solid ${Colors.dividerColor}`,
                                maxWidth: "200px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                              }}
                            >
                              {formatFieldValue(getNestedValue(response, field))}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <TablePagination
            component="div"
            count={formData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FormResponseSubmitted;