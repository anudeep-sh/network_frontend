// FileUpload.js
import React, { useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

const FileUpload = ({ title, captureText, name, accept, showPreview }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  const handleCameraClick = () => {
    document.getElementById(name).click();
  };

  return (
    <Box mb={3}>
      <Typography variant="h6" mb={2}>{title}</Typography>
      <Button
        variant="outlined"
        onClick={handleCameraClick}
        fullWidth
      >
        {captureText}
      </Button>
      <input
        id={name}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={handleFileChange}
        capture="environment"
        name={name}
      />
      {file && (
        <Box mt={2} display="flex" alignItems="center">
          {showPreview && (
            <Card sx={{ maxWidth: 345, mr: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={URL.createObjectURL(file)}
                alt="File Preview"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {file?.name}
                </Typography>
              </CardContent>
            </Card>
          )}
          <Typography variant="body2" mr={2}>{file?.name}</Typography>
          <IconButton onClick={handleFileRemove}>
            <CancelIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
