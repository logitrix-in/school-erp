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
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import OfflineApplicationForm from "./OfflineApplicationForm";
import { useState } from "react";

const ApplicationRecieved = () => {
  const series = [490, 400, 250, 103];

  const options = {
    labels: ["Website ", "Offline", "Advertisement", "others"],
    colors: ["#FF4560", "#008FFB", "#FEB019", "#775DD0"],
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            label: "hello",
          },
        },
      },
    },
  };

  const [applocationPopupOpen,setApplocationPopupOpen] = useState(false);

  const onApplicationClose = () => {
    setApplocationPopupOpen(false);
  }
  return (
    <>
      <Box
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
      </Box>

      <Box display={"flex"} flexDirection={{ xs: "column", md: "row" }}>
        <Box
          mt={2}
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

          <DatePicker label="Date" defaultValue={dayjs()} />
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
        <Box flex={3} p={3} pb={0}>
          <OfflineApplicationForm open={applocationPopupOpen} close={onApplicationClose}/>
          <Chart options={options} series={series} type="donut" height={350} />
          <Box display={"flex"} justifyContent={"center"} gap={"1rem"} mt={5}>
            <Button variant="contained" color="primary" onClick={()=> setApplocationPopupOpen(true)}>
              Apply Offline
            </Button>
            <Button variant="contained" color="primary">
              Notify
            </Button>
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={1} pt={3}>
            <Button variant="contained" size="small" color="secondary" >View</Button>
            <Button variant="contained" size="small" color="secondary" >Excel</Button>
            <Button variant="contained" size="small" color="secondary" >CSV</Button>
            <Button variant="contained" size="small" color="secondary" >Print</Button>
        </Box>
      </Box>
    </>
  );
};

export default ApplicationRecieved;
