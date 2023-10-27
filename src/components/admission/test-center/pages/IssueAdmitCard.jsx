import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Bbox from "../../../UiComponents/Bbox";
import { Link } from "react-router-dom";
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

const IssueAdmitCard = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    api.get("/admission/test-center/issue-admit-card/").then((res) => {
      console.log(res.data.admit_card);
      setApplicants(res.data.admit_card);
    });
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
        console.log(res.data);
        toast.success("Admit Card Sent Successfully");
      })
      .catch((err) => {
        console.log(err);
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
        console.log(res.data);
        window.open(res.data.link, "_blank", "noopener,noreferrer");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setDownloadLoading(false);
      });
  };

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const doSearch = () => {
    if (search == "") return setSearchResult([]);
    var value = applicants.filter(
      (app) =>
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.id.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(value);
  };

  function timeToDate(timeString) {
    console.log(timeString);
    var timeParts = timeString.split(":");
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);
    var seconds = parseInt(timeParts[2], 10);

    // Create a new Date object
    var dateObject = new Date();

    // Set the hours, minutes, and seconds of the Date object
    dateObject.setHours(hours);
    dateObject.setMinutes(minutes);
    dateObject.setSeconds(seconds);

    return dateObject;
  }

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
        id: selected?.id,
        date: selected?.date != "" ? dayjs(selected.date) : dayjs(),
        venue: selected?.venue,
        time: timeToDate(selected?.startTime),
        duration: timeToDate(selected?.duration.toString()),
      }));
  }, [selected]);

  useEffect(() => {
    console.log(playload);
  }, [playload]);

  return (
    <>
      <ToastContainer />
      <Bbox borderRadius={1} p={1} pb={0}>
        <Typography
          p={1}
          px={2}
          borderRadius={1}
          bgcolor={"#f2f2f2"}
          fontWeight={600}
        >
          Admit Card - Quick Search
        </Typography>

        <Box py={1} display={"flex"} flexDirection={"column"} gap={1}>
          <Box justifyContent={"right"} display={"flex"} gap={1}>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: "50%" }}
              size="small"
              placeholder="Search by Candidate Name / Application ID"
            />
            <Button variant="contained" size="small" onClick={doSearch}>
              Search
            </Button>
          </Box>

          {searchResult.length > 0 && (
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
                  Applicant ID
                </Typography>
                <Typography
                  flex={2}
                  minWidth={"200px"}
                  p={1}
                  sx={{
                    borderRight: "1px solid rgba(0,0,0,0.2)",
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                    bgcolor: "rgba(0,0,0,0.05)",
                    textAlign: "center",
                  }}
                >
                  Candidate Name
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
                  Issue Date
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
                  Applying For
                </Typography>
                <Typography
                  flex={1}
                  minWidth={"100px"}
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

              {searchResult.map((app, idx) => (
                <Box display={"flex"} key={idx}>
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
                    {app.id}
                  </Typography>
                  <Typography
                    flex={2}
                    minWidth={"200px"}
                    p={1}
                    sx={{
                      borderRight: "1px solid rgba(0,0,0,0.2)",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      textAlign: "center",
                    }}
                  >
                    {app.name}
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
                    {app.issueDate}
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
                    {app.applyingFor}
                  </Typography>

                  <Box
                    flex={1}
                    display={"flex"}
                    minWidth={"100px"}
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
                      onClick={() => setSelected(applicants[idx])}
                    >
                      Select
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
                  {selected.name}
                </Typography>
                <Typography fontSize={"0.9rem"} fontWeight={500}>
                  {selected.issueDate}
                </Typography>
              </Box>
              <Typography fontSize={"0.8rem"}>
                Application Id: {selected.id}
              </Typography>
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
                <Grid item xs={3}>
                  <LoadingButton
                    loading={admitLoding}
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={sendAdmit}
                  >
                    Send Admit Card
                  </LoadingButton>
                </Grid>
                <Grid item xs={3}>
                  <LoadingButton
                    loading={downloadLoding}
                    size="large"
                    fullWidth
                    variant="outlined"
                    onClick={downloadAdmit}
                  >
                    Download Admit Card
                  </LoadingButton>
                </Grid>
              </Grid>
            </Bbox>
          )}
        </Box>
      </Bbox>

      <Bbox borderRadius={1} p={1} mt={2}>
        <Typography
          p={1}
          px={2}
          borderRadius={1}
          bgcolor={"#f2f2f2"}
          fontWeight={600}
        >
          Admit Card - Bulk Manage
        </Typography>
        <Grid container spacing={2} py={1}>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              LinkComponent={Link}
              to="bulk-manage"
            >
              Issue Admit Card
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="outlined">
              Download Report
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="outlined">
              Download Admit Card
            </Button>
          </Grid>
        </Grid>
      </Bbox>
    </>
  );
};

export default IssueAdmitCard;
