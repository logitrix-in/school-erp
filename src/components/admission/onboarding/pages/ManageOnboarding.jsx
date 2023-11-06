import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";

const ManageOnboarding = () => {
  const columns = [
    {
      field: "class",
      headerName: "Class",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "vacancy",
      headerName: "Vacancy",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "MLStatus",
      headerName: "Mertit List Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "WLStatus",
      headerName: "Waiting List Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "OnboardingPending",
      headerName: "Onboarding Pending",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "OnboardingRejected",
      headerName: "Onboarding Rejected",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "OnboardingSuccessful",
      headerName: "Onboarding Successful",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <Box>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Typography
          p={1}
          px={1.5}
          bgcolor={"#eeeeee"}
          fontWeight={500}
          borderRadius={1}
        >
          Onboarding Overview
        </Typography>
        <Box>
          <FormControl sx={{ width: "10rem" }}>
            <InputLabel>Admission Year</InputLabel>
            <Select label="Admission Year">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "10rem", ml: 1 }}>
            <InputLabel>Class</InputLabel>
            <Select label="Admission Year">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <DataGrid
            disableRowSelectionOnClick
            hideFooter={true}
            rows={[
              {
                id: 1,
                class: "Class A",
                vacancy: 10,
                MLStatus: "Accepted",
                WLStatus: "Pending",
                OnboardingPending: 5,
                OnboardingRejected: 2,
                OnboardingSuccessful: 3,
              },
            ]}
            columns={columns}
          />
        </Box>

        <Typography
          p={1}
          px={1.5}
          bgcolor={"#eeeeee"}
          fontWeight={500}
          borderRadius={1}
          mt={2}
        >
          Initiate Onboarding Based on Merit/Waiting List
        </Typography>
        <Box display={"flex"} gap={1}>
          <Button
            variant="contained"
            fullWidth
            LinkComponent={Link}
            to="merit-list/"
          >
            Merit List
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            LinkComponent={Link}
            to="waiting-list/"
          >
            Waiting List
          </Button>
        </Box>

        <Typography
          p={1}
          px={1.5}
          bgcolor={"#eeeeee"}
          fontWeight={500}
          borderRadius={1}
          mt={2}
        >
          Direct Onboarding
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box>
            <TextField
              sx={{ width: "25rem", mr: 1 }}
              size="small"
              label="Enter Email Address / Application ID"
            />
            <Button variant="contained">Initiate</Button>
            <Button variant="outlined" sx={{ ml: 1 }}>
              View/Edit Template
            </Button>
          </Box>

          <Typography mt={1} fontWeight={600}>
            Bulk Upload for onboarding
          </Typography>
          <Box display={"flex"} gap={1}>
            <Button variant="contained">Download Template</Button>
            <Button variant="contained" color="secondary" component="label">
              Upload
              <input type="file" hidden accept=".csv" />
            </Button>
          </Box>

          <Box display={"flex"} gap={1} alignItems={"center"}>
            <Typography fontWeight={500}>
              25 new candidate details have been uploaded for Onboarding
            </Typography>
            <Button variant="outlined">View/Edit</Button>
            <Button variant="contained">Initiate</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageOnboarding;
