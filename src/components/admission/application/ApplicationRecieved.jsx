import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
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

const ApplicationRecieved = () => {
  let data = {
    academic_year: "2023-24",
    // start_date: "2023-09-21",
    // end_date: "2023-09-24",
    // class: {
    //   type: "custom",
    //   criteria: ["11", "5"],
    // },
  };

  const [series, setSeries] = useState([]);

  useEffect(() => {
    console.log(series);
  }, [series]);

  useEffect(() => {
    function getChart() {
      axios
        .post(
          "https://web-production-a472.up.railway.app/api/admission/application/graph/",
          data,
          {
            headers: {
              "x-api-key": "a8518942-17ea-44a6-b4e1-a974189a9a90",
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response.data);
          var values = Object.keys(response.data)
            .filter((key) => key !== "all")
            .map((key) => response.data[key]);

          console.log(values);

          setSeries(values);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getChart();

    // setInterval(() => {
    //   getChart();
    // }, 100000000);

    return () => clearInterval();
  }, []);

  const options = {
    labels: ["Offline ", "Online", "Marketing", "Others"],
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

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

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

            <Select defaultValue={30} size="small" onChange={() => {}}>
              <MenuItem value={10}>Un- screened</MenuItem>
              <MenuItem value={20}>Screened</MenuItem>
              <MenuItem value={30}>All</MenuItem>
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
              // flex={1}
              display={"flex"}
              flexDirection={"column"}
              gap={"2rem"}
              bgcolor={"white"}
            >
              <FormControl fullWidth>
                <InputLabel>Academic Year</InputLabel>
                <Select label="Academic Year" defaultValue={10}>
                  <MenuItem value={10}>2023-24</MenuItem>
                  <MenuItem value={20}>2024-25</MenuItem>
                  <MenuItem value={30}>2025-26</MenuItem>
                </Select>
              </FormControl>
              {/* <DateRangePicker
                label="Date"
                defaultValue={[dayjs("2022-04-17"), dayjs("2022-04-21")]}
              /> */}
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />

              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select defaultValue={0} label="class">
                  <MenuItem value={0}>All</MenuItem>
                  <MenuItem value={10}>1</MenuItem>
                  <MenuItem value={20}>2</MenuItem>
                  <MenuItem value={30}>3</MenuItem>
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
              <OfflineApplicationForm
                open={applocationPopupOpen}
                close={onApplicationClose}
              />
              <Notify open={notifyPopup} close={() => setNotifyPopup(false)} />

              <Chart
                options={options}
                series={series}
                type="donut"
                height={400}
              />

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
              <Link to={'view'}>
                <Button variant="outlined" size="small" color="info">
                  View
                </Button>
              </Link>
              <Button variant="outlined" size="small" color="info">
                Excel
              </Button>
              <Button variant="outlined" size="small" color="info">
                CSV
              </Button>
              <Button variant="outlined" size="small" color="info">
                Print
              </Button>
            </Box>
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default ApplicationRecieved;
