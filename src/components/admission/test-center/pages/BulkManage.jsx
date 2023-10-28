import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonBase,
  Card,
  Checkbox,
  Chip,
  Dialog,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Bbox from "../../../UiComponents/Bbox";
import {
  DateField,
  DatePicker,
  MobileTimePicker,
  TimeField,
  TimePicker,
} from "@mui/x-date-pickers";
import api from "../../../../config/api";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import { Mail } from "@mui/icons-material";
import { Icon } from "@iconify/react";

const BulkManage = () => {
  const [classes, setClasses] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [generatebatchLoading, setgeneratebatchLoading] = useState(false);

  function fetchData() {
    api
      .get("/admission/test-center/issue-admit-card/create-batch/")
      .then((res) => {
        console.log(res.data.classes);
        setClasses(res.data.classes);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(selectedClass);
  }, [selectedClass]);

  function timeToDate(timeString) {
    var timeParts = timeString.split(":");
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);
    var seconds = parseInt(timeParts[2], 10);

    var dateObject = new Date();

    dateObject.setHours(hours);
    dateObject.setMinutes(minutes);
    dateObject.setSeconds(seconds);

    return dateObject;
  }

  const [playload, setPlayload] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayload((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(playload);
  }, [playload]);

  function generateBatches() {
    setgeneratebatchLoading(true);
    api
      .put("/admission/test-center/issue-admit-card/create-batch/", {
        applyingFor: selectedClass?.applying_for,
        max_candidates_per_badge: parseInt(batchSettings.max_number),
        check_non_issued: batchSettings.is_issued,
        admit_card_type: batchSettings.admit_card_type,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.length == 0)
          toast.error("No Applicants in this class to generate batches");
        else {
          toast.success(
            `${res.data.length} batches created for class ${selectedClass?.applying_for}`
          );
        }

        console.log("hehe");
        fetchData();
        setSelectedClass(null);
        console.log("hoho");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setgeneratebatchLoading(false);
      });
  }

  // handle batch settings

  const [batchSettings, setBatchSettings] = useState({
    is_issued: false,
    max_number: 0,
    admit_card_type: "Online Test",
  });

  useEffect(() => {
    console.log(batchSettings);
  }, [batchSettings]);

  function handleSettingChange(name, value) {
    setBatchSettings((prev) => ({ ...prev, [name]: value }));
  }

  // select Batch

  const [selectBatch, setSelectBatch] = useState(null);
  const [openbatchPopup, setOpenbatchPopup] = useState(false);
  const [saveBatchButtonLoading, setSaveBatchButtonLoading] = useState(false);

  useEffect(() => {
    selectBatch &&
      setPlayload((prev) => ({
        ...prev,
        applyingFor: selectedClass.applying_for,
        batch_id: selectBatch?.batch_no,
        exam_date: selectBatch?.exam_date,
        start_time: selectBatch?.start_time,
        duration: selectBatch?.duration,
        venue: selectBatch?.venue,
      }));
  }, [selectBatch]);

  return (
    <>
      <ToastContainer />
      <Bbox borderRadius={1} p={1}>
        <Typography
          p={1}
          px={2}
          borderRadius={1}
          bgcolor={"#f2f2f2"}
          fontWeight={600}
        >
          Issue Admit Card
        </Typography>

        <Bbox mt={2} display={"flex"} borderRadius={1}>
          {/* left */}
          <Box
            width={"15rem"}
            height={"60vh"}
            overflow={"auto"}
            display={"flex"}
            // bgcolor={'primary.lighter'}
            gap={1}
            flexDirection={"column"}
            sx={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}
            p={2}
          >
            {classes?.map((cl, idx) => (
              <ButtonBase
                key={idx}
                sx={{
                  padding: 1,
                  px: 2,
                  bgcolor: `${
                    selectedClass?.applying_for == cl.applying_for
                      ? "primary.main"
                      : "white"
                  }`,
                  color: `${
                    selectedClass?.applying_for != cl.applying_for
                      ? "primary.main"
                      : "white"
                  }`,
                  border: "1px solid blue",
                  borderColor: "primary.main",
                  borderRadius: 1,
                }}
                onClick={() => {
                  setSelectedClass(
                    classes.find((c) => c.applying_for == cl.applying_for)
                  );
                }}
              >
                <Typography>Class {cl.applying_for}</Typography>
              </ButtonBase>
            ))}
          </Box>

          {/* popup */}

          {selectBatch && (
            <Dialog
              maxWidth="md"
              fullWidth
              open={openbatchPopup}
              onClose={() => setOpenbatchPopup(false)}
            >
              <Box flex={2} p={2} borderRadius={1}>
                <Typography fontSize={"1rem"} fontWeight={500}>
                  {selectBatch?.batch_no}
                </Typography>
                <Grid container spacing={1} rowSpacing={2}>
                  <Grid item xs={3}>
                    <DatePicker
                      defaultValue={dayjs(
                        new Date(selectBatch?.exam_date ?? new Date())
                      )}
                      onChange={(val) => {
                        console.log(dayjs(new Date(val)).format("DD MMM YYYY"));
                        handleChange({
                          target: {
                            name: "exam_date",
                            value: dayjs(new Date(val)).format("YYYY-MM-DD"),
                          },
                        });
                      }}
                      label="Exam Date"
                      sx={{ mt: 2, width: "100%" }}
                      format="DD MMM YYYY"
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      name="venue"
                      defaultValue={selectBatch?.venue}
                      onChange={handleChange}
                      label="Exam Venue"
                      fullWidth
                      sx={{ mt: 2 }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TimePicker
                      // defaultValue={dayjs(timeToDate(selectBatch?.start_time == null))}
                      defaultValue={
                        selectBatch?.start_time ?? false
                          ? dayjs(timeToDate(selectBatch?.start_time))
                          : dayjs(timeToDate("00:00:00"))
                      }
                      onChange={(val) =>
                        handleChange({
                          target: {
                            name: "start_time",
                            value: dayjs(val).format("HH:mm"),
                          },
                        })
                      }
                      sx={{ width: "100%" }}
                      label="Select Start Time"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TimeField
                      defaultValue={
                        selectBatch?.duration != null
                          ? dayjs(timeToDate(selectBatch?.duration))
                          : dayjs(timeToDate("00:00:00"))
                      }
                      onChange={(val) => {
                        handleChange({
                          target: {
                            name: "duration",
                            value: dayjs(val).format("HH:mm"),
                          },
                        });
                      }}
                      label="Exam Duration"
                      views={["hours", "minutes"]}
                      format="HH:mm"
                      ampm={false}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <LoadingButton
                      loading={saveBatchButtonLoading}
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        setSaveBatchButtonLoading(true);
                        api
                          .post(
                            "/admission/test-center/issue-admit-card/create-batch/",
                            playload
                          )
                          .then((res) => {
                            console.log(res.data);
                            toast.success(
                              `${playload.batch_id} is saved successfully`
                            );
                          })
                          .catch((err) => console.log(err))
                          .finally(() => {
                            setOpenbatchPopup(false);
                            setSaveBatchButtonLoading(false);
                          });
                      }}
                    >
                      Save Batch
                    </LoadingButton>
                    <LoadingButton
                      disabled
                      fullWidth
                      size="medium"
                      variant="contained"
                    >
                      Send Admit Card
                    </LoadingButton>

                    <LoadingButton
                      disabled
                      size="medium"
                      fullWidth
                      variant="outlined"
                    >
                      Export Admit Card
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Box>
            </Dialog>
          )}

          {/* right */}
          {selectedClass &&
            (selectedClass.batches.length > 0 ? (
              <Box
                p={2}
                flex={1}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"flex-start"}
              >
                <Typography
                  fontSize={"1rem"}
                  borderRadius={1}
                  color={"white"}
                  fontWeight={400}
                  p={0.5}
                  px={1}
                  bgcolor={"primary.main"}
                  width={"100%"}
                >
                  Generated Batches for Class {selectedClass?.applying_for}
                </Typography>

                <Box
                  display={"flex"}
                  flexWrap={"wrap"}
                  gap={2}
                  mt={2}
                  height={"40vh"}
                  overflow={"auto"}
                >
                  {selectedClass?.batches
                    .sort(function (a, b) {
                      var batchNumberA = parseInt(a.batch_no.split(" ")[1]);
                      var batchNumberB = parseInt(b.batch_no.split(" ")[1]);
                      return batchNumberA - batchNumberB;
                    })
                    .map((bat, idx) => (
                      <Card
                        key={idx}
                        elevation={10}
                        sx={{
                          borderRadius: 1,
                          border: "1px solid #eeeeee",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box bgcolor={"secondary.main"} height={8} />
                        <Box px={2} py={1.4} width={"18rem"}>
                          <Typography
                            fontSize={"1.1rem"}
                            fontWeight={500}
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            {bat.batch_no}{" "}
                            <Chip
                              size="small"
                              sx={{ px: 1 }}
                              color={bat.is_mail_sent ? "success" : "error"}
                              icon={<Mail />}
                              label={bat.is_mail_sent ? "Sent" : "Not Send"}
                              variant="outlined"
                            />
                          </Typography>

                          <Box
                            display={"flex"}
                            pt={0.8}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Typography fontSize={"0.8rem"} fontWeight={400}>
                              Candidates Allocated:
                            </Typography>
                            <Typography fontSize={"0.9rem"} fontWeight={400}>
                              {bat.application?.length}
                            </Typography>
                          </Box>
                          <Box
                            display={"flex"}
                            pt={0.8}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Typography fontSize={"0.8rem"} fontWeight={400}>
                              Exam Date
                            </Typography>
                            <Typography fontSize={"0.9rem"} fontWeight={400}>
                              {bat.exam_date
                                ? dayjs(new Date(bat.exam_date)).format(
                                    "DD MMM YYYY"
                                  )
                                : "Not Issued"}
                            </Typography>
                          </Box>
                          <Box
                            display={"flex"}
                            pt={0.8}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Typography fontSize={"0.8rem"} fontWeight={400}>
                              Exam Time
                            </Typography>
                            <Typography fontSize={"0.9rem"} fontWeight={400}>
                              {bat.start_time == null
                                ? "Not Issued"
                                : dayjs(timeToDate(bat.start_time)).format(
                                    "hh:mm a"
                                  )}
                            </Typography>
                          </Box>
                          <Box
                            display={"flex"}
                            pt={0.8}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Typography fontSize={"0.8rem"} fontWeight={400}>
                              duration
                            </Typography>
                            <Typography fontSize={"0.9rem"} fontWeight={400}>
                              {bat.duration == null
                                ? "Not Issued"
                                : dayjs(timeToDate(bat.duration))
                                    .format("hh:mm")
                                    .replace(":", "h ") + "m"}
                            </Typography>
                          </Box>
                          <Box
                            display={"flex"}
                            pt={0.8}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            mb={1}
                          >
                            <Typography fontSize={"0.8rem"} fontWeight={400}>
                              Exam Venue
                            </Typography>
                            <Typography
                              width={"50%"}
                              textAlign={"right"}
                              fontSize={"0.9rem"}
                              fontWeight={400}
                            >
                              {bat.venue == null ? "Not Issued" : bat.venue}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          display={"flex"}
                          mt={"auto"}
                          borderTop={"1px solid #e4e4e4"}
                        >
                          <Button
                            variant="contained"
                            sx={{ borderRadius: 0 }}
                            fullWidth
                            onClick={() => {
                              setOpenbatchPopup(true);
                              setSelectBatch(bat);
                            }}
                          >
                            Update
                          </Button>
                          <Button
                            variant=""
                            color="error"
                            sx={{ borderRadius: 0, color: "red" }}
                            fullWidth
                          >
                            delete
                          </Button>
                        </Box>
                      </Card>
                    ))}
                </Box>
                <Box sx={{ mt: 3 }} mt={"auto"} display={"flex"} gap={1}>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => {
                      api
                        .delete(
                          "/admission/test-center/issue-admit-card/create-batch/",
                          {
                            data: { applyingFor: selectedClass?.applying_for },
                          }
                        )
                        .then((res) => {
                          fetchData();
                          setSelectedClass(null);
                        })
                        .catch((err) => console.log(err.response));
                    }}
                  >
                    Re-Generate
                  </Button>
                  <Button variant="contained">Send Admit Card</Button>
                </Box>
              </Box>
            ) : (
              <Box
                p={2}
                flex={1}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
              >
                <Typography
                  fontSize={"1rem"}
                  borderRadius={1}
                  color={"white"}
                  fontWeight={400}
                  p={0.5}
                  px={1}
                  mb={1}
                  bgcolor={"primary.main"}
                  width={"100%"}
                >
                  Class {selectedClass?.applying_for}
                </Typography>
                <Box>
                  <FormControl>
                    <FormControlLabel
                      label="Only Issue admit card for candidates whose admit card has not been issued yet."
                      control={<Checkbox />}
                      onChange={(_, c) => handleSettingChange("is_issued", c)}
                      checked={batchSettings.is_issued}
                    />
                  </FormControl>
                  <Box mt={2} display={"flex"} gap={2} alignItems={"center"}>
                    <Typography>366 candidates have been selected</Typography>
                    <Button variant="outlined">View</Button>
                  </Box>
                </Box>
                <Box mt={2} display={"flex"} gap={2} alignItems={"center"}>
                  <Typography>
                    Maximum number of candidates allowed per batch
                  </Typography>
                  <TextField
                    type="number"
                    sx={{ width: "6ch" }}
                    size="small"
                    onChange={(e) =>
                      handleSettingChange("max_number", e.target.value)
                    }
                    value={batchSettings.max_number}
                  />
                </Box>
                <Box mt={2} display={"flex"} gap={2} alignItems={"center"}>
                  <FormControl sx={{ width: "10rem" }}>
                    <InputLabel>Admit Card Type</InputLabel>
                    <Select
                      label="Admit Card Type"
                      onChange={(e) =>
                        handleSettingChange("admit_card_type", e.target.value)
                      }
                      value={batchSettings.admit_card_type}
                    >
                      {[
                        "Online Test",
                        "Offline Test",
                        "Online Test & Interview",
                        "Offline Test & Interview",
                        "Only Interview",
                      ].map((m, i) => (
                        <MenuItem key={i} value={m}>
                          {m}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <LoadingButton
                  loading={generatebatchLoading}
                  sx={{ mt: "auto" }}
                  variant="contained"
                  onClick={() => {
                    generateBatches();
                    // fetchData();
                    // setSelectedClass(null);
                  }}
                >
                  Generate Batches
                </LoadingButton>
              </Box>
            ))}
        </Bbox>
      </Bbox>
    </>
  );
};

export default BulkManage;
