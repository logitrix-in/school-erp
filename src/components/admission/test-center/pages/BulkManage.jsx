import {
  Box,
  Button,
  Checkbox,
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

const BulkManage = () => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    api
      .post("/admission/test-center/issue-admit-card/create-batch/", {
        applyingFor: "all",
        max_candidates_per_badge: 3,
        check_non_issued: false,
      })
      .then((res) => {
        console.log(res.data);
        setBadges(res.data.badges);
      })
      .catch((err) => console.log(err));
  }, []);

  const [admitLoding, setAdmitLoading] = useState(false);
  const [downloadLoding, setDownloadLoading] = useState(false);

  const sendAdmit = () => {
    setAdmitLoading(true);
    api
      .post("/admission/test-center/issue-admit-card/", {
        id: playload.id,
        date: dayjs(playload.date).format("YYYY-MM-DD"),
        venue: playload.venue,
        time: dayjs(playload.time).format("HH:mm"),
        duration: dayjs(playload.duration).format("HH:mm"),
      })
      .then((res) => {
        toast.success("Admit Card Sent Successfully");
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setAdmitLoading(false);
      });
  };

  const downloadAdmit = () => {
    setDownloadLoading(true);
    api
      .post("/admission/test-center/download-admit-card/", { id: playload.id })
      .then((res) => {
        window.open(res.data.link, "_blank", "noopener,noreferrer");
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setDownloadLoading(false);
      });
  };

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

  const [selected, setSelected] = useState(null);

  const [playload, setPlayload] = useState({
    id: "",
    date: dayjs(new Date("30 oct 2023")),
    venue: "",
    time: timeToDate("00:00:00"),
    duration: timeToDate("00:00:00"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayload((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (selected)
      setPlayload((prev) => ({
        ...prev,
        id: selected.id,
        date: selected?.date != "" ? dayjs(selected.date) : dayjs(),
        venue: selected?.venue,
        time: timeToDate(selected?.start_time),
        duration: timeToDate(selected?.duration.toString()),
      }));
  }, [selected]);

  useEffect(() => {
    console.log(playload);
  }, [playload]);

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

        <Box>
          <FormControl>
            <FormControlLabel
              label="Only Issue admit card for candidates whose admit card has not been issued yet."
              control={<Checkbox />}
            />
          </FormControl>

          <Box mt={2} display={"flex"} gap={2} alignItems={"center"}>
            <FormControl sx={{ width: "10rem" }}>
              <InputLabel>Select Class</InputLabel>
              <Select label="Select Class">
                <MenuItem value="1">I</MenuItem>
                <MenuItem value="2">II</MenuItem>
              </Select>
            </FormControl>
            <Typography>366 candidates have been selected</Typography>
            <Button variant="outlined">View / Edit</Button>
          </Box>
        </Box>
        <Box mt={2} display={"flex"} gap={2} alignItems={"center"}>
          <Typography>
            Maximum number of candidates allowed per batch
          </Typography>
          <TextField type="number" sx={{ width: "6ch" }} size="small" />
        </Box>
        <Box mt={2} display={"flex"} gap={2} alignItems={"center"}>
          <FormControl sx={{ width: "10rem" }}>
            <InputLabel>Admit Card Type</InputLabel>
            <Select label="Admit Card Type">
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

        <Box py={1} display={"flex"} flexDirection={"column"} gap={1}>
          {[1, 2].length > 0 && (
            <Box
              overflow={"auto"}
              sx={{
                border: "1px solid rgba(0,0,0,0.2)",
                borderBottom: 0,
                borderRadius: 0,
              }}
            >
              <Box display={"flex"}>
                <Typography
                  flex={0.5}
                  minWidth={"50px"}
                  p={1}
                  sx={{
                    borderRight: "1px solid rgba(0,0,0,0.2)",
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                    bgcolor: "rgba(0,0,0,0.05)",
                    textAlign: "center",
                  }}
                >
                  Batch No.
                </Typography>
                <Typography
                  flex={1}
                  minWidth={"100px"}
                  p={1}
                  sx={{
                    borderRight: "1px solid rgba(0,0,0,0.2)",
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                    bgcolor: "rgba(0,0,0,0.05)",
                    textAlign: "center",
                  }}
                >
                  Candidates Allocated
                </Typography>
                <Typography
                  flex={1}
                  minWidth={"100px"}
                  p={1}
                  sx={{
                    borderRight: "1px solid rgba(0,0,0,0.2)",
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                    bgcolor: "rgba(0,0,0,0.05)",
                    textAlign: "center",
                  }}
                >
                  Exam Date
                </Typography>
                <Typography
                  flex={1}
                  minWidth={"100px"}
                  p={1}
                  sx={{
                    borderRight: "1px solid rgba(0,0,0,0.2)",
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                    bgcolor: "rgba(0,0,0,0.05)",
                    textAlign: "center",
                  }}
                >
                  Start Time
                </Typography>
                <Typography
                  flex={1}
                  minWidth={"150px"}
                  p={1}
                  sx={{
                    bgcolor: "rgba(0,0,0,0.05)",
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                    textAlign: "center",
                  }}
                >
                  Actions
                </Typography>
              </Box>

              {badges.map((app, idx) => (
                <Box display={"flex"} key={idx}>
                  <Typography
                    flex={0.5}
                    minWidth={"50px"}
                    p={1}
                    sx={{
                      borderRight: "1px solid rgba(0,0,0,0.2)",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      textAlign: "center",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Batch {idx + 1}
                  </Typography>
                  <Typography
                    flex={1}
                    minWidth={"100px"}
                    p={1}
                    sx={{
                      borderRight: "1px solid rgba(0,0,0,0.2)",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      textAlign: "center",
                    }}
                  >
                    {app.candidates_allocated}
                  </Typography>
                  <Typography
                    flex={1}
                    minWidth={"100px"}
                    p={1}
                    sx={{
                      borderRight: "1px solid rgba(0,0,0,0.2)",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      textAlign: "center",
                    }}
                  >
                    {app?.date != ""
                      ? dayjs(new Date(app.date)).format("DD MMM YYYY")
                      : dayjs().format("DD MMM YYYY")}
                  </Typography>
                  <Typography
                    flex={1}
                    minWidth={"100px"}
                    p={1}
                    sx={{
                      borderRight: "1px solid rgba(0,0,0,0.2)",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      textAlign: "center",
                    }}
                  >
                    {dayjs(timeToDate(app.start_time)).format("hh:mm a")}
                  </Typography>

                  <Box
                    flex={1}
                    display={"flex"}
                    minWidth={"150px"}
                    gap={1}
                    justifyContent={"center"}
                    p={1}
                    sx={{
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      onClick={() =>
                        setSelected({ ...badges[idx], id: idx + 1 })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      fullWidth
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => {}}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {selected && (
            <Bbox p={2} borderRadius={1}>
              <Box
                justifyContent={"space-between"}
                display={"flex"}
                width={"100%"}
              >
                <Typography fontSize={"1.1rem"} fontWeight={500}>
                  Batch {selected.id}
                </Typography>
                <Typography fontSize={"0.9rem"} fontWeight={500}>
                  {selected.issueDate}
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <DatePicker
                    onChange={(val) =>
                      handleChange({
                        target: {
                          name: "date",
                          value: val,
                        },
                      })
                    }
                    value={playload.date}
                    label="Exam Date"
                    sx={{ mt: 2, width: "100%" }}
                    format="DD MMM YYYY"
                  />
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    name="venue"
                    onChange={handleChange}
                    value={playload.venue}
                    label="Exam Venue"
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TimePicker
                    onChange={(val) =>
                      handleChange({
                        target: {
                          name: "time",
                          value: dayjs(val),
                        },
                      })
                    }
                    value={dayjs(playload.time)}
                    sx={{ width: "100%" }}
                    label="Select Start Time"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TimeField
                    onChange={(val) => {
                      console.log(dayjs(val));
                      handleChange({
                        target: {
                          name: "duration",
                          value: dayjs(val),
                        },
                      });
                    }}
                    label="Exam Duration"
                    views={["hours", "minutes"]}
                    value={dayjs(playload.duration)}
                    format="HH:mm"
                    ampm={false}
                  />
                </Grid>
                <Grid item xs={2}>
                  <LoadingButton
                    loading={admitLoding}
                    fullWidth
                    size="medium"
                    variant="contained"
                    // onClick={sendAdmit}
                  >
                    Save Batch
                  </LoadingButton>
                </Grid>
                <Grid item xs={2}>
                  <LoadingButton
                    loading={admitLoding}
                    fullWidth
                    size="medium"
                    variant="contained"
                    // onClick={sendAdmit}
                  >
                    Send Admit Card
                  </LoadingButton>
                </Grid>
                <Grid item xs={2}>
                  <LoadingButton
                    size="medium"
                    fullWidth
                    variant="outlined"
                    // onClick={downloadAdmit}
                  >
                    Download Admit Card
                  </LoadingButton>
                </Grid>
              </Grid>
            </Bbox>
          )}
        </Box>
        <Box display={"flex"} gap={1}>
          <Button variant="contained">Add Batch</Button>
          <Button variant="outlined">Reset</Button>
        </Box>
      </Bbox>
    </>
  );
};

export default BulkManage;
