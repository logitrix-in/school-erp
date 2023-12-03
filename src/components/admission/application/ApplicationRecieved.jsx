import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import Chart from "react-apexcharts";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DateRangePicker, DateRange } from "react-date-range";
import { addDays } from "date-fns";
import dayjs from "dayjs";
import OfflineApplicationForm from "./popups/OfflineApplicationForm";
import { useEffect, useState } from "react";
import Notify from "./popups/Notify";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import api from "../../../config/api";
import useClasses from "../../../hooks/useClasses";

const ApplicationRecieved = () => {
  const [series, setSeries] = useState([]);
  const [filter, setFilter] = useState({});

  function getChart() {
    api
      .post("/admission/application/graph/", filter)
      .then((response) => {
        var values = Object.keys(response.data)
          .filter((key) => key !== "all")
          .map((key) => response.data[key]);

        setSeries(values);
      })
      .catch((error) => {});
  }

  useEffect(() => {
    getChart();

    return () => clearInterval();
  }, []);

  useEffect(() => {
    getChart();
  }, [filter]);

  const options = {
    labels: ["Offline ", "Online", "Advertisement ", "Others"],
    colors: ["#FF5630", "#00A76F", "#FFAB00", "#00B8D9"],
    legend: {
      show: true,
      position: "bottom",
      fontSize: "14px",
      itemMargin: {
        horizontal: 10,
        vertical: 20,
      },
    },
    chart: {
      animations: {
        enabled: true,
        easing: "linear",
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 1000,
        },
      },
      toolbar: {
        // show: true,
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 10,
        color: "#000000",
        opacity: 0.1,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "88%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: false,
              label: "Total",
              color: "#673AB7",
              fontWeight: "600",
            },
            value: {
              offsetY: 0,
            },
          },
        },
      },
    },
  };

  const [applocationPopupOpen, setApplocationPopupOpen] = useState(false);
  const [notifyPopup, setNotifyPopup] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { classes } = useClasses();

  const curYear = new Date().getFullYear();

  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;

  const [acYear, setAcYear] = useState(academicYear);
  const [curClass, setClass] = useState([]);

  const [type, setType] = useState("all");

  // filter

  useEffect(() => {
    if (endDate == "") setEndDate(startDate);

    const _filter = {
      academic_year: acYear,
      start_date: startDate && new Date(startDate).toLocaleDateString("en-CA"),
      end_date: endDate && new Date(endDate).toLocaleDateString("en-CA"),
      class: curClass,
      type: type,
    };
    console.log(_filter);
    setFilter(_filter);
  }, [acYear, curClass, startDate, endDate, type]);

  useEffect(() => {
    console.log(curClass);
  }, [curClass]);

  const handleClassChange = (e) => {
    const {
      target: { value },
    } = e;
    if (value[value.length - 1] === "all") {
      setClass(curClass.length === classes.length ? [] : classes);
      return;
    }
    setClass(typeof value === "string" ? value.split(",") : value);
  };

  const onApplicationClose = () => {
    setApplocationPopupOpen(false);
  };

  return (
    <>
      <RevealCard>
        <Bbox borderRadius={2} overflow={"hidden"}>
          <Box
            bgcolor={"white"}
            py={1.3}
            px={3}
            borderRadius={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
              Application Recieved
            </Typography>

            <Select
              defaultValue={"all"}
              size="small"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <MenuItem value={"unscreened"}>Un- screened</MenuItem>
              <MenuItem value={"screened"}>Screened</MenuItem>
              <MenuItem value={"all"}>All</MenuItem>
            </Select>
          </Box>

          <Divider />

          <Box
            display={"flex"}
            gap={5}
            flexDirection={{ xs: "column", lg: "row" }}
            alignItems={{ xs: "strech", lg: "center" }}
          >
            <Box
              p={3}
              display={"flex"}
              // flex={0.7}
              width={"25rem"}
              // bgcolor={'red'}
              flexDirection={"column"}
              gap={"2rem"}
            >
              <FormControl fullWidth>
                <InputLabel>Academic Year</InputLabel>
                <Select
                  label="Academic Year"
                  value={acYear}
                  onChange={(e) => setAcYear(e.target.value)}
                >
                  <MenuItem value={"2021-22"}>2021-22</MenuItem>
                  <MenuItem value={"2023-24"}>2023-24</MenuItem>
                  <MenuItem value={"2024-25"}>2024-25</MenuItem>
                  <MenuItem value={"2025-26"}>2025-26</MenuItem>
                </Select>
              </FormControl>

              <Box display={"flex"} gap={2}>
                <DatePicker
                  label="Start Date"
                  onChange={(e) => setStartDate(e)}
                  // minDate={dayjs()}
                  format="DD MMM YYYY"
                />
                <DatePicker
                  format="DD MMM YYYY"
                  label="End Date"
                  minDate={startDate}
                  onChange={(e) => setEndDate(e)}
                />
              </Box>

              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  placeholder="All"
                  multiple
                  value={curClass}
                  onChange={handleClassChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                  input={<OutlinedInput label="class" />}
                  renderValue={(selected) =>
                    selected.length == classes.length
                      ? "All"
                      : selected.join(", ")
                  }
                >
                  <MenuItem value="all">
                    <ListItemIcon>
                      <Checkbox
                        checked={
                          classes.length > 0 &&
                          curClass.length === classes.length
                        }
                        indeterminate={
                          curClass.length > 0 &&
                          curClass.length < classes.length
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary="Select All" />
                  </MenuItem>
                  {classes.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox
                        size="small"
                        checked={curClass.indexOf(name) > -1}
                      />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              p={3}
              flex={2}
              display={"flex"}
              flexDirection={"column"}
              gap={"2rem"}
              borderRadius={2}
              bgcolor={"white"}
            >
              {applocationPopupOpen && (
                <OfflineApplicationForm
                  open={applocationPopupOpen}
                  close={onApplicationClose}
                />
              )}

              <Notify open={notifyPopup} close={() => setNotifyPopup(false)} />
              {series.every((value) => value == 0) ? (
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={400}
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/023/392/613/original/no-data-or-chart-to-display-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                    alt=""
                    height={350}
                  />
                </Box>
              ) : (
                <Chart
                  options={options}
                  series={series}
                  type="donut"
                  height={400}
                />
              )}

              <Box display={"flex"} justifyContent={"center"} gap={"1rem"}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setApplocationPopupOpen(true)}
                >
                  Apply Offline
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setNotifyPopup(true)}
                >
                  Notify
                </Button>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={1}
              p={3}
              borderRadius={2}
            >
              <Link to={"view/"}>
                <Button variant="outlined" size="small" color="primary">
                  View
                </Button>
              </Link>
              <Button variant="outlined" size="small" color="info">
                Excel
              </Button>

              {/* <Button
                variant="outlined"
                size="small"
                color="info"
              >
                Print
              </Button> */}
            </Box>
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default ApplicationRecieved;
