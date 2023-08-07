import { Icon } from "@iconify/react";
import {
  Box,
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

const ScreeningDashboard = () => {
  return (
    <>
      <Box
        bgcolor={"white"}
        py={2}
        px={2}
        borderRadius={2}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"500"} borderRadius={1}>
          Dashboard
        </Typography>
      </Box>

      <Box display={"flex"} mt={2} gap={2}>
          <Box
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

        <Box
          flex={2}
          bgcolor={"white"}
          borderRadius={2}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          position={"relative"}
        >
          <Typography fontWeight={500} fontSize={"1rem"}>
            Total Application Recieved
          </Typography>
          <Typography fontSize={"2rem"} mt={2} color={"secondary.main"}>
            1000
          </Typography>
          <Box position={"absolute"} bottom={14} right={14}>
            <IconButton>
              <Icon
                fontSize={"2rem"}
                icon="material-symbols:download"
                color="inherit"
              />
            </IconButton>
          </Box>
        </Box>
        <Box
          flex={2}
          borderRadius={2}
          bgcolor={"white"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          position={"relative"}
        >
          <Typography fontWeight={500} fontSize={"1rem"}>
            Screening Pending
          </Typography>
          <Typography fontSize={"2rem"} mt={2} color={"secondary.main"}>
            491
          </Typography>
          <Typography mt={1} color={"text.secondary"}>
            49.1% applications yet to be system screened
          </Typography>

          <Box position={"absolute"} bottom={14} right={14}>
            <IconButton>
              <Icon
                fontSize={"2rem"}
                icon="material-symbols:download"
                color="inherit"
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ScreeningDashboard;
