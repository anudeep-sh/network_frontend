import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { SideBarWidth } from "../../utils/SideBarWidth";
import { Colors } from "../../Theme/Theme";
import { FormOption } from "../../api/requests/FormOptions";
import styled from "@emotion/styled";

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

const CreateFormOptions = () => {
  const [formData, setFormData] = useState({
    form_type: "",
    form_field: "",
    options: { values: [{ value: "", label: "" }] },
  });

  const [formOptions, setFormOptions] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const fetchedFields = useRef(new Set());
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (index, key, value) => {
    const updatedOptions = [...formData.options.values];
    updatedOptions[index][key] = value;
    setFormData({ ...formData, options: { values: updatedOptions } });
  };

  const addOption = () => {
    setFormData({
      ...formData,
      options: {
        values: [...formData.options.values, { value: "", label: "" }],
      },
    });
  };

  const removeOption = (index) => {
    const updatedOptions = formData.options.values.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, options: { values: updatedOptions } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        form_type: formData.form_type,
        form_field: formData.form_field,
        options: { values: formData.options.values },
      };
      if (formData.id) {
        await FormOption.updateFormOptions(formData?.id, payload);
        setFormOptions((prevList) =>
          prevList.map((form) =>
            form.id === formData.id ? { ...form, ...payload } : form
          )
        );
        alert("Form updated successfully!");
      } else {
        const response = await FormOption.createFormOptions(formData);
        alert(response?.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error submitting form.");
    } finally {
      setFormData({
        form_type: "",
        form_field: "",
        options: { values: [{ value: "", label: "" }] },
      });
    }
  };

  const getFormOptionsFields = async (fieldName) => {
    setLoading(true);
    if (fetchedFields.current.has(fieldName)) return; // Prevent duplicate calls
    fetchedFields.current.add(fieldName);
    try {
      const { data } = await FormOption.getFormOptions(fieldName);
      if (data?.length > 0) {
        const newOptions = data.reduce((acc, item) => {
          const formType = item.form_type;
          const fieldData = {
            id: item.id,
            form_field: item.form_field.trim(),
            options: { values: item.options?.values || [] },
          };

          const existingIndex = acc.findIndex(
            (group) => group.form_type === formType
          );
          if (existingIndex !== -1) {
            acc[existingIndex].fields.push(fieldData);
          } else {
            acc.push({ form_type: formType, fields: [fieldData] });
          }

          return acc;
        }, []);
        setFormOptions((prevOptions) => [...prevOptions, ...newOptions]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fields = [
      "hospital_cash",
      "business_loan",
      "home_loan",
      "personal_loan",
      "ca_registration",
    ];
    fields.forEach((field) => getFormOptionsFields(field));
  }, []);

  const handleEditForm = (selectedForm) => {
    setIsEdit(true);
    setFormData({
      id: selectedForm?.id,
      form_type: selectedForm?.form_type,
      form_field: selectedForm?.form_field,
      options: { values: selectedForm?.options.values },
    });
  };
  const handleFieldEdit = (formTypeIndex, fieldIndex) => {
    const selectedForm = formOptions[formTypeIndex].fields[fieldIndex]; // Ensure you're picking a field
    const formType = formOptions[formTypeIndex].form_type; // Get the form_type
    const updatedSelectedForm = { ...selectedForm, form_type: formType }; // Add form_type
    handleEditForm(updatedSelectedForm);
  };

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
        {" "}
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
          <Typography variant="h5" fontWeight={700}>
            Create Form Options
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ pl: { xs: "0px!important" } }}>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              textAlign={"left"}
              sx={{ p: "0px!important" }}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" gutterBottom display={"block"}>
                  Form Type
                </Typography>
                <StyledTextField
                  size="small"
                  name="form_type"
                  value={formData?.form_type}
                  fullWidth
                  required
                  onChange={handleChange}
                  disabled={isEdit}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" gutterBottom display={"block"}>
                  Form Field
                </Typography>
                <StyledTextField
                  size="small"
                  name="form_field"
                  value={formData?.form_field}
                  fullWidth
                  required
                  onChange={handleChange}
                  disabled={isEdit}
                />
              </Grid>
              {formData.options.values.map((option, index) => (
                <Grid
                  container
                  item
                  spacing={2}
                  key={index}
                  alignItems="center"
                >
                  <Grid item xs={6} sm={5}>
                    <Typography
                      variant="caption"
                      gutterBottom
                      display={"block"}
                    >
                      Value
                    </Typography>
                    <StyledTextField
                      size="small"
                      fullWidth
                      value={option.value}
                      onChange={(e) =>
                        handleOptionChange(index, "value", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={6} sm={5}>
                    <Typography
                      variant="caption"
                      gutterBottom
                      display={"block"}
                    >
                      Label
                    </Typography>
                    <StyledTextField
                      size="small"
                      fullWidth
                      value={option.label}
                      onChange={(e) =>
                        handleOptionChange(index, "label", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Button
                      onClick={() => removeOption(index)}
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                        mt: { sm: 2 },
                        borderColor: Colors.primary,
                        color: Colors.primary,
                        "&:hover": {
                          borderColor: Colors.hoverColorBtn,
                        },
                      }}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  onClick={addOption}
                  variant="outlined"
                  sx={{
                    borderColor: Colors.primary,
                    color: Colors.primary,
                    "&:hover": {
                      borderColor: Colors.hoverColorBtn,
                    },
                  }}
                >
                  Add Option
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: Colors.primary,
                    color: Colors.white,
                    "&:hover": {
                      backgroundColor: Colors.hoverColorBtn,
                    },
                  }}
                >
                  {formData.id ? "Update" : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} sx={{ pr: 2 }}></Grid>
      </Grid>
      <Box
        sx={{
          flexGrow: 1,
          width: {
            xs: "100%",
            md: `calc(100% - ${SideBarWidth}px)`,
          },
          ml: { md: `${SideBarWidth}px` },
          mt: 2,
        }}
      >
        {loading ? (
          <CircularProgress sx={{color:Colors.primary}} size={"24px"} />
        ) : (
          <Grid container spacing={2} textAlign={"left"} sx={{}}>
            {formOptions?.map((item, groupIndex) => {
              return (
                <Grid item xs={12} md={4}>
                  <Box sx={{ backgroundColor: "#ffffff", p: 2 }}>
                    <Typography variant="body1" gutterBottom display={"block"}>
                      {item?.form_type}
                    </Typography>
                    {item?.fields?.map((field, fieldIndex) => (
                      <Box
                        key={field.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          p: 1,
                          border: "1px solid #e4e4e4",
                          my: 1,
                        }}
                      >
                        <Typography variant="subtitle2">
                          {field.form_field}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            textTransform: "capitalize",

                            borderColor: Colors.primary,
                            color: Colors.primary,
                            "&:hover": {
                              borderColor: Colors.hoverColorBtn,
                            },
                          }}
                          onClick={() =>
                            handleFieldEdit(groupIndex, fieldIndex)
                          }
                        >
                          Edit
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default CreateFormOptions;
