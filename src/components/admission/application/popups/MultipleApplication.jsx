import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

const MultipleApplication = ({ close, open }) => {
  return (
    <Dialog
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: "100%",
        },
      }}
      maxWidth="md"
      open={open}
      onClose={() => close()}
      disableEnforceFocus={true}
    >
      <Box overflow={"hidden"}>
        <Typography
          p={1}
          py={1.5}
          bgcolor={"primary.main"}
          color={"white"}
          fontSize={"1rem"}
          textAlign={"center"}
        >
          Multiple Application
        </Typography>

        <Box p={2}>
          <FormControl fullWidth>
            <FormLabel>
              Multiple Application from Single Candidate for same Class
            </FormLabel>
            <RadioGroup defaultValue="Accept the last application">
              <FormControlLabel
                value="Accept the last application"
                control={<Radio />}
                label="Accept the last application"
              />
              <FormControlLabel
                value="Accept the first application"
                control={<Radio />}
                label="Accept the first application"
              />
              <FormControlLabel
                value="Reject All applications"
                control={<Radio />}
                label="Reject All applications"
              />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel>
              Multiple Application from Single Candidate for multiple Class
            </FormLabel>
            <RadioGroup defaultValue="Accept All Applications">
              <FormControlLabel
                value="Accept All Applications"
                control={<Radio />}
                label="Accept All Applications"
              />
              <FormControlLabel
                value="Accept application for highest class"
                control={<Radio />}
                label="Accept application for highest class"
              />
              <FormControlLabel
                value="Response Apply Offline Multiple Application"
                control={<Radio />}
                label="Response Apply Offline Multiple Application"
              />
              <FormControlLabel
                value="Reject all applications"
                control={<Radio />}
                label="Reject all applications"
              />
            </RadioGroup>
          </FormControl>
          <Divider sx={{my:2}}/>
          <Button fullWidth variant="contained">Apply</Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default MultipleApplication;
