import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Chart from "react-apexcharts";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from "dayjs";
import OfflineApplicationForm from "./popups/OfflineApplicationForm";
import { useState } from "react";
import Notify from "./popups/Notify";
import Bbox from "../../UiComponents/Bbox";

const ApplicationRecieved = () => {
  const series = [200, 55, 145, 90];

  const options = {
    labels: ["Website ", "Offline", "Advertisement", "others"],
    colors: ["#FF5630", "#00A76F", "#FFAB00", "#00B8D9"],
    legend: {
      show: true,
      position: "bottom",
      fontSize: "14px",
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    chart: {
      toolbar: {
        show: true,
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

  const onApplicationClose = () => {
    setApplocationPopupOpen(false);
  };
  return (
    <>
      <Bbox
        bgcolor={"white"}
        py={1.3}
        px={2}
        borderRadius={2}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"500"} borderRadius={1}>
          Application Recieved
        </Typography>

        <Select defaultValue={30} size="small" onChange={() => {}}>
          <MenuItem value={10}>Un- screened</MenuItem>
          <MenuItem value={20}>Screened</MenuItem>
          <MenuItem value={30}>All</MenuItem>
        </Select>
      </Bbox>

      <Box
        mt={1}
        display={"flex"}
        gap={2}
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={"flex-start"}
      >
        <Bbox
          ox
          p={3}
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          gap={"2rem"}
          borderRadius={2}
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

          <DateRangePicker label="Date" defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]} />
          <FormControl fullWidth>
            <InputLabel>Class</InputLabel>
            <Select defaultValue={0} label="class">
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={10}>1</MenuItem>
              <MenuItem value={20}>2</MenuItem>
              <MenuItem value={30}>3</MenuItem>
            </Select>
          </FormControl>
        </Bbox>
        <Bbox
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

          <Chart options={options} series={series} type="donut" height={350} />
          <Box display={"flex"} justifyContent={"center"} gap={"1rem"} mt={5}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setApplocationPopupOpen(true)}
            >
              Apply Offline
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setNotifyPopup(true)}
            >
              Notify
            </Button>
          </Box>
        </Bbox>
        <Bbox
          display={"flex"}
          flexDirection={"column"}
          gap={1}
          p={3}
          borderRadius={2}
        >
          <Button variant="contained" size="small" color="secondary">
            View
          </Button>
          <Button variant="contained" size="small" color="secondary">
            Excel
          </Button>
          <Button variant="contained" size="small" color="secondary">
            CSV
          </Button>
          <Button variant="contained" size="small" color="secondary">
            Print
          </Button>
        </Bbox>
      </Box>
    </>
  );
};

export default ApplicationRecieved;
