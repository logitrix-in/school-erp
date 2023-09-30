import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import api from "../../../../config/api";
import { Icon } from "@iconify/react";
import { DatePicker } from "@mui/x-date-pickers";

const EditManageApplication = ({ open, close }) => {
  const classOptions = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI Science",
    "XI Commerce",
    "XI Arts",
    "XII Science",
    "XII Commerce",
    "XII Arts",
  ];

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
        <Box bgcolor={"primary.main"} display={"flex"}>
          <Typography
            flex={1}
            ml={5}
            p={1}
            py={1.5}
            color={"white"}
            fontSize={"1rem"}
            textAlign={"center"}
          >
            Edit Applications
          </Typography>
          <IconButton
            aria-label="delete"
            sx={{ mr: 1 }}
            onClick={() => close()}
          >
            <Icon icon={"ep:close-bold"} color="white" fontSize={"1.3rem"} />
          </IconButton>
        </Box>

        <Box display={"flex"} gap={2} p={2} py={2} alignItems={"center"}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Class"
                >
                  {classOptions.map((val, idx) => (
                    <MenuItem key={idx} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <DatePicker label="Open Date" format="DD MMM, YYYY" />
            </Grid>
            <Grid item xs={3}>
              <DatePicker format="DD MMM, YYYY" label="Close Date" />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Class"
                >
                  <MenuItem value={10}>Open</MenuItem>
                  <MenuItem value={20}>Close</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
};

export default EditManageApplication;
