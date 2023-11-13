import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { signal } from "@preact/signals-react";
import React, { useEffect, useState } from "react";
import useClasses from "../../../../hooks/useClasses";
import api from "../../../../config/api";
import { et } from "date-fns/locale";
import { ToastContainer, toast } from "react-toastify";

const isInitiating = signal(false);
const initiatingFor = signal("");

const email = signal(true);
const message = signal(false);
const whatsapp = signal(false);

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

  const { classes, acYear, curYear } = useClasses();

  const [selectedClass, setClass] = useState("I");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(curYear);
  const [data, setData] = useState(null);
  const [tableRow, setTableRow] = useState(null);

  useEffect(() => {
    api
      .get(`/admission/test-center/onboarding/overview/?type=merit_list`, {
        params: {
          admission_year: "2023-24",
          applyingFor: selectedClass,
        },
      })
      .then((res) => {
        setTableRow([{ ...res.data, id: 1 }]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .get("/admission/test-center/onboarding/initiate/online/data/", {
        params: {
          applyingFor: selectedClass,
          admission_year: "2023-24",
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(
          res.data.map((app, idx) => ({
            id: idx,
            key: idx,
            rank: idx + 1,
            ApplicationID: app?.application_no,
            CandidateName: app?.name,
            OnboardingStatus: app?.status,
          }))
        );
      });
  }, []);

  return (
    <Box>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Typography
          p={1}
          px={1.5}
          bgcolor={"#eeeeee"}
          fontWeight={500}
          borderRadius={1}
          mb={1}
        >
          Onboarding Overview
        </Typography>
        <Box>
          <FormControl sx={{ width: "10rem" }}>
            <InputLabel>Admission Year</InputLabel>
            <Select
              label="Admission Year"
              value={selectedAcademicYear}
              onChange={(e) => setSelectedAcademicYear(e.target.value)}
            >
              {acYear.map((y, i) => (
                <MenuItem key={i} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "10rem", ml: 1 }}>
            <InputLabel>Class</InputLabel>
            <Select
              label="Class"
              value={selectedClass}
              onChange={(e) => {
                setClass(e.target.value);
                setData(null);
                setTableRow(null);

                api
                  .get(
                    `/admission/test-center/onboarding/overview/?type=merit_list`,
                    {
                      params: {
                        admission_year: "2023-24",
                        applyingFor: e.target.value,
                      },
                    }
                  )
                  .then((res) => {
                    setTableRow([{ ...res.data, id: 1 }]);
                    console.log(res.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                api
                  .get(
                    "/admission/test-center/onboarding/initiate/online/data/",
                    {
                      params: {
                        applyingFor: e.target.value,
                        admission_year: "2023-24",
                      },
                    }
                  )
                  .then((res) => {
                    console.log(res.data);
                    setData(
                      res.data.map((app, idx) => ({
                        id: idx,
                        key: idx,
                        rank: idx + 1,
                        ApplicationID: app?.application_no,
                        CandidateName: app?.name,
                        OnboardingStatus: app?.status,
                      }))
                    );
                  });
              }}
            >
              {classes.map((cl, idx) => (
                <MenuItem key={idx} value={cl}>
                  {cl}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {tableRow && data ? (
          <>
            <Box>
              <Box>
                <DataGrid
                  disableRowSelectionOnClick
                  hideFooter={true}
                  rows={tableRow ?? []}
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

              <Box mt={1} height={400}>
                <DataGrid
                  checkboxSelection // Enable checkbox selection for the entire DataGrid
                  disableSelectionOnClick
                  // getRowId={(row) => row.ApplicationID}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  rowSelectionModel={selectionModel}
                  onRowSelectionModelChange={handleSelectionModelChange}
                  rows={data ?? []}
                  columns={MeritListColumn}
                  isRowSelectable={(row) =>
                    row.row.OnboardingStatus != "Rejected"
                  }
                />
              </Box>
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
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={500}
                    mt={1}
                  >
                    Initiate {initiatingFor.value} Onboarding for{" "}
                    {selectionModel.length} students
                  </Typography>
                  <FormControlLabel
                    disabled
                    control={<Checkbox defaultChecked />}
                    label="Email"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    onChange={(_, v) => (message.value = v)}
                    label="SMS"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    onChange={(_, v) => (whatsapp.value = v)}
                    label="Whatsapp"
                  />
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    disabled={selectionModel.length == 0}
                    onClick={() => {
                      const payload = {
                        onboarding: "merit-list",
                        type: initiatingFor.value,
                        email: true,
                        sms: message.value,
                        whatsapp: whatsapp.value,
                        app_ids: selectionModel,
                      };

                      api
                        .post(
                          "/admission/test-center/onboarding/initiate/",
                          payload
                        )
                        .then((res) => {
                          console.log(res.data);
                          toast.success(res.data.message);
                        });
                    }}
                  >
                    Initiate
                  </Button>
                  <ToastContainer />
                  <Button onClick={() => (isInitiating.value = false)}>
                    Back
                  </Button>
                </Box>
              )}
            </Box>
          </>
        ) : (
          <Box>
            <Skeleton variant="rounded" height={110} />
            <Skeleton variant="rounded" sx={{ mt: 2 }} height={435} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OnboardingMeritList;
