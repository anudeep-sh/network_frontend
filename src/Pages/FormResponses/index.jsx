import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import { SideBarWidth } from "../../utils/SideBarWidth";

const formTypes = [
  "hospital_cash",
  "business_loan",
  "home_loan",
  "personal_loan",
  "ca_registration",
];

const FormResponses = () => {
  const [selectedTab, setSelectedTab] = useState(formTypes[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://network-backend-f54r2j2fnq-uc.a.run.app/forms?page=${
            page + 1
          }&limit=${rowsPerPage}&type=${selectedTab}`,
          {
            headers: {
              Authorization: `Bearer`,
            },
          }
        );
        setData(response?.data?.data || []);
        setTotalRows(response?.data?.pagination?.total);
        setTotalPage(response?.data?.pagination?.totalPages);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const flattenObject = (obj, prefix = "") => {
    let result = {};
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        result = { ...result, ...flattenObject(obj[key], prefix + key + ".") };
      } else {
        result[prefix + key] = obj[key];
      }
    }
    return result;
  };

  const flattenedData = data?.map((item) => flattenObject(item));

  return (
    <Box
      sx={{
        m: 0,
        width: {
          xs: "100%",
          md: `calc(100% - ${SideBarWidth}px)`,
        },
        ml: { md: `${SideBarWidth}px` },
        py: { xs: 3, md: 2 },
        px: { xs: 2, md: 2 },
      }}
    >
      <Box sx={{ p: 2, backgroundColor: "#ffffff" }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs example"
        >
          {formTypes.map((type) => (
            <Tab
              key={type}
              label={type.replace("_", " ").toUpperCase()}
              value={type}
            />
          ))}
        </Tabs>

        {loading && (
          <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
        )}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {!loading && !error && flattenedData.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(flattenedData[0]).map((key) => (
                    <TableCell key={key}>
                      <strong>{key.replace(/_/g, " ").toUpperCase()}</strong>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {flattenedData.map((form, idx) => (
                  <TableRow key={idx}>
                    {Object.values(form).map((value, index) => (
                      <TableCell key={index}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!loading && !error && flattenedData.length > 0 && (
          <TablePagination
            component="div"
            count={totalRows}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        )}

        {!loading && !error && data.length === 0 && (
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            No form responses found
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FormResponses;
