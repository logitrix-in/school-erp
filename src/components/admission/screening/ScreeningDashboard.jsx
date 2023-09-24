import { Icon } from "@iconify/react";
import {
  Box,
  Card,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useState } from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";

const ScreeningDashboard = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  return (
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
            Dashboard
          </Typography>
        </Box>

        <Divider />

        <Box
          display={"flex"}
          gap={5}
          flexDirection={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "center" }}
          p={3}
        >
          <Box
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

          <Box display={"flex"} flexDirection={"column"} gap={2} flex={1}>
            <Box
              flex={1}
              borderRadius={1}
              p={2}
              display={"flex"}
              alignItems={'center'}
              sx={{
                background: "linear-gradient(to right, #2C7BA0, #9BD9F4)",
              }}
            >
              <Box flex={2} p={3}>
                <Typography fontSize={'4rem'} fontWeight={500} color={'#CEE7FF'} lineHeight={1.2}>1000</Typography>
                <Typography fontSize={'1.5rem'} color={'#CDDFF4'}>Total Application Recieved</Typography>
              </Box>
              <Box flex={1}>
                <Icon icon={'material-symbols:person'} fontSize={'10rem'} color="#2C7BA0"/>
              </Box>
            </Box>
            <Box
              flex={1}
              borderRadius={1}
              p={2}
              display={"flex"}
              alignItems={'center'}
              sx={{
                background: "linear-gradient(to right, #E59D7A, #FAD2C0)",
              }}
            >
              <Box flex={2} p={3}>
                <Typography fontSize={'4rem'} fontWeight={500} color={'#B34A19'} lineHeight={1.2}>491</Typography>
                <Typography fontSize={'1.5rem'} color={'#974B27'}>Screening Pending</Typography>
              </Box>
              <Box flex={1}>
                <Icon icon={'material-symbols:person'} fontSize={'10rem'} color="#C4673B"/>
              </Box>
            </Box>
          </Box>
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default ScreeningDashboard;
