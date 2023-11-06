import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { signal } from "@preact/signals-react";
import React, { useState } from "react";

const isInitiating = signal(false);
const initiatingFor = signal("");

const OnboardingMeritList = () => {
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

  const MeritListColumn = [
    {
      field: "checkbox", // Special field for checkbox selection
      headerName: "Select",
      width: 80,
      checkboxSelection: true, // Enable checkbox selection
      headerCheckboxSelection: true, // Enable header checkbox for selecting all rows
    },
    {
      field: "rank",
      headerName: "Rank",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ApplicationID",
      headerName: "Application ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "CandidateName",
      headerName: "Candidate Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "OnboardingStatus",
      headerName: "Onboarding Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  const [selectionModel, setSelectionModel] = useState([]);

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
    console.log("Selected Rows:", newSelectionModel);
  };

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

        <Box>
          <DataGrid
            checkboxSelection // Enable checkbox selection for the entire DataGrid
            disableSelectionOnClick
            getRowId={(row) => row.ApplicationID}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={handleSelectionModelChange}
            rows={[
              {
                id: 1,
                rank: 1,
                ApplicationID: "ACS102211",
                CandidateName: "John Doe",
                OnboardingStatus: "Approved",
                OnboardingPending: 0,
              },
              {
                id: 2,
                rank: 2,
                ApplicationID: "ACS102269",
                CandidateName: "Hello World",
                OnboardingStatus: "Rejected",
                OnboardingPending: 0,
              },
              {
                id: 3,
                rank: 3,
                ApplicationID: "ACS102280",
                CandidateName: "No Idea",
                OnboardingStatus: "Not Initiated",
                OnboardingPending: 0,
              },
            ]}
            columns={MeritListColumn}
            isRowSelectable={(row) => row.row.OnboardingStatus != "Rejected"}
          />
        </Box>

        <Box mb={2}>
          {!isInitiating.value ? (
            <Box display={"flex"} gap={1}>
              <Button
                variant="contained"
                onClick={() => {
                  initiatingFor.value = "online";
                  isInitiating.value = !isInitiating.value;

                  console.log(isInitiating.value);
                }}
              >
                Initiate Online Onboarding Request
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  initiatingFor.value = "offline";
                  isInitiating.value = !isInitiating.value;
                  console.log(isInitiating.value);
                }}
              >
                Initiate Offline Onboarding Request
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography textTransform={"capitalize"} fontWeight={500} mt={1}>
                Initiate {initiatingFor.value} Onboarding for{" "}
                {selectionModel.length} students
              </Typography>
              <FormControlLabel
                disabled
                control={<Checkbox defaultChecked />}
                label="Email"
              />
              <FormControlLabel control={<Checkbox />} label="SMS" />
              <FormControlLabel control={<Checkbox />} label="Whatsapp" />
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                disabled={selectionModel.length == 0}
              >
                Initiate
              </Button>
              <Button onClick={() => (isInitiating.value = false)}>Back</Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OnboardingMeritList;
