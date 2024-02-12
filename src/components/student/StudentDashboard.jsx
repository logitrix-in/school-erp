import React, { useEffect, useState } from "react";
import RevealCard from "../AnimationComponents/RevealCard";
import Bbox from "../UiComponents/Bbox";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@iconify/react";
import Chart from "react-apexcharts";

const StudentDashboard = () => {
  return (
    <RevealCard>
      <Bbox borderRadius={2} overflow={"hidden"}>
        {/* dashboard top text box */}
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

        {/* divider */}
        <Divider />

        <Box
          display={"flex"}
          gap={2}
          flexDirection={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "center" }}
          p={2}
          pb={2}
        >
          {/* left drop-down section */}
          <Bbox
            borderRadius={1}
            p={3}
            flex={1}
            py={5}
            display={"flex"}
            flexDirection={"column"}
            gap={"2rem"}
            bgcolor={"white"}
            width={{ xs: "100%", lg: "30rem" }}
          >
            {/* academic year drop-down */}
            <FormControl fullWidth style={{ width: 329, height: 55 }}>
              <InputLabel>Academic Year</InputLabel>
              <Select
                label="Academic Year"
                // value={acYear}
                // onChange={(e) => setAcYear(e.target.value)}
              >
                <MenuItem value={""}>Academic Year</MenuItem>
                <MenuItem value={"2023-24"}>2023-24</MenuItem>
                <MenuItem value={"2022-23"}>2022-23</MenuItem>
                <MenuItem value={"2021-22"}>2021-22</MenuItem>
                <MenuItem value={"2020-21"}>2020-21</MenuItem>
                <MenuItem value={"2019-20"}>2019-20</MenuItem>
                <MenuItem value={"2018-19"}>2018-19</MenuItem>
              </Select>
            </FormControl>

            {/* class drop-down */}
            <FormControl fullWidth style={{ width: 329, height: 55 }}>
              <InputLabel>Class</InputLabel>
              <Select
                label="Class"
                // value={acYear}
                // onChange={(e) => setAcYear(e.target.value)}
              >
                <MenuItem value={""}>Class</MenuItem>
                <MenuItem value={"Nursery"}>Nursery</MenuItem>
                <MenuItem value={"PP1"}>PP1</MenuItem>
                <MenuItem value={"PP2"}>PP2</MenuItem>
                <MenuItem value={"I"}>I</MenuItem>
                <MenuItem value={"II"}>II</MenuItem>
                <MenuItem value={"III"}>III</MenuItem>
                <MenuItem value={"IV"}>IV</MenuItem>
                <MenuItem value={"V"}>V</MenuItem>
                <MenuItem value={"VI"}>VI</MenuItem>
                <MenuItem value={"VII"}>VII</MenuItem>
                <MenuItem value={"VIII"}>VIII</MenuItem>
                <MenuItem value={"IX"}>IX</MenuItem>
                <MenuItem value={"X"}>X</MenuItem>
                <MenuItem value={"XI Science"}>XI Science</MenuItem>
                <MenuItem value={"XI Commerce"}>XI Commerce</MenuItem>
                <MenuItem value={"XI Humanities"}>XI Humanities</MenuItem>
                <MenuItem value={"XII Science"}>XII Science</MenuItem>
                <MenuItem value={"XII Commerce"}>XII Commerce</MenuItem>
                <MenuItem value={"XII Humanities"}>XII Humanities</MenuItem>
              </Select>
            </FormControl>

            {/* section drop-down */}
            <FormControl fullWidth style={{ width: 329, height: 55 }}>
              <InputLabel>Section</InputLabel>
              <Select
                label="Section"
                // value={acYear}
                // onChange={(e) => setAcYear(e.target.value)}
              >
                <MenuItem value={""}>Section</MenuItem>
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"C"}>C</MenuItem>
                <MenuItem value={"D"}>D</MenuItem>
              </Select>
            </FormControl>

            {/* status drop-down */}
            <FormControl fullWidth style={{ width: 329, height: 55 }}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                // value={acYear}
                // onChange={(e) => setAcYear(e.target.value)}
              >
                <MenuItem value={""}>Status</MenuItem>
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Suspended"}>Suspended</MenuItem>
                <MenuItem value={"Separated"}>Separated</MenuItem>
              </Select>
            </FormControl>
          </Bbox>

          {/* mid grid section */}
          <Grid container spacing={1} flex={2}>
            {/* total students sections */}
            <Grid item xs={6} style={{ width: 530, height: 235 }}>
              <Bbox
                height={"11rem"}
                bgcolor={"primary.light"}
                borderRadius={1}
                p={2}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="stretch"
                position={"relative"}
              >
                {/* total students in number */}
                <Typography
                  fontSize={30}
                  fontWeight="600"
                  color={"primary.dark"}
                  align="left"
                >
                  1266
                </Typography>

                {/* total students in text */}
                <Typography
                  fontSize={15}
                  fontWeight="300"
                  color={"#3B98C4"}
                  align="left"
                  style={{ marginTop: "-2rem" }}
                >
                  Total students
                </Typography>

                {/* flex-row */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  style={{ paddingBottom: "0.5rem", paddingRight: "2rem" }}
                >
                  {/* active section */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    borderRight="1px solid black"
                    paddingRight="1rem"
                    paddingBottom="0.5rem"
                  >
                    <Typography
                      fontSize={15}
                      fontWeight="500"
                      color={"primary.dark"}
                    >
                      1230
                    </Typography>
                    <Typography
                      fontSize={10}
                      fontWeight="300"
                      color={"primary.dark"}
                    >
                      Active
                    </Typography>
                  </Box>
                  {/* suspended section */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    borderRight="1px solid black"
                    paddingRight="1rem"
                  >
                    <Typography
                      fontSize={15}
                      fontWeight="500"
                      color={"primary.dark"}
                    >
                      36
                    </Typography>
                    <Typography
                      fontSize={10}
                      fontWeight="300"
                      color={"primary.dark"}
                    >
                      Suspended
                    </Typography>
                  </Box>
                  {/* saperated section */}
                  <Box display="flex" flexDirection="column" alignItems="left">
                    <Typography
                      fontSize={15}
                      fontWeight="500"
                      color={"primary.dark"}
                    >
                      36
                    </Typography>
                    <Typography
                      fontSize={10}
                      fontWeight="300"
                      color={"primary.dark"}
                    >
                      Separated
                    </Typography>
                  </Box>
                </Box>

                {/* download icon */}
                <Box position={"absolute"} bottom={"0.1rem"} right={"0.1rem"}>
                  <IconButton>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton>
                </Box>
              </Bbox>
            </Grid>

            {/* student-teacher ratio section */}
            <Grid item xs={6} style={{ width: 530, height: 235 }}>
              <Bbox
                height={"11rem"}
                bgcolor={"secondary.light"}
                borderRadius={1}
                p={2}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="stretch"
                position={"relative"}
              >
                {/* ration in number */}
                <Typography
                  fontSize={30}
                  fontWeight="600"
                  color={"primary.dark"}
                  align="left"
                >
                  24:1
                </Typography>

                {/* student-teacher ratio text */}
                <Typography
                  fontSize={15}
                  fontWeight="300"
                  color={"#B34A19"}
                  align="left"
                  style={{ marginTop: "-2rem" }}
                >
                  Student-Teacher Ratio
                </Typography>

                {/* flex row */}
                <Box
                  display="flex"
                  style={{ paddingBottom: "0.5rem", paddingRight: "2rem" }}
                >
                  {/* total students */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    borderRight="1px solid black"
                    paddingRight="1rem"
                    paddingBottom="0.5rem"
                  >
                    <Typography
                      fontSize={15}
                      fontWeight="500"
                      color={"primary.dark"}
                    >
                      1266
                    </Typography>
                    <Typography
                      fontSize={10}
                      fontWeight="300"
                      color={"primary.dark"}
                    >
                      Students
                    </Typography>
                  </Box>
                  {/* total teachers */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    paddingLeft="1rem"
                  >
                    <Typography
                      fontSize={15}
                      fontWeight="500"
                      color={"primary.dark"}
                    >
                      53
                    </Typography>
                    <Typography
                      fontSize={10}
                      fontWeight="300"
                      color={"primary.dark"}
                    >
                      Teachers
                    </Typography>
                  </Box>
                </Box>

                {/* download icon */}
                <Box position={"absolute"} bottom={"0.1rem"} right={"0.1rem"}>
                  <IconButton>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton>
                </Box>
              </Bbox>
            </Grid>

            {/* vaccancy section */}
            <Grid item xs={6} style={{ width: 530, height: 235 }}>
              <Bbox
                height={"11rem"}
                bgcolor={"secondary.light"}
                borderRadius={1}
                p={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                position={"relative"}
              >
                {/* left side */}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  gap={2}
                  paddingLeft={1}
                >
                  {/* total vacancy */}
                  <Typography
                    fontSize={30}
                    fontWeight="600"
                    color={"primary.dark"}
                    align="left"
                    style={{ marginBottom: "-1rem" }}
                  >
                    22
                  </Typography>

                  {/* vacancy text */}
                  <Typography
                    fontSize={15}
                    fontWeight="500"
                    color={"#B34A19"}
                    align="left"
                    style={{ marginBottom: "-1rem" }}
                  >
                    Vacancy
                  </Typography>

                  {/* fulfilment percentage */}
                  <Typography
                    fontSize={9}
                    fontWeight="400"
                    color={"#626262"}
                    align="left"
                    style={{ marginBottom: "1rem" }}
                  >
                    96 % Fulfillment
                  </Typography>
                </Box>

                {/* chart showing vacancy */}
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Chart
                    options={{
                      chart: {
                        type: "donut",
                        width: "100%",
                        height: "100%",
                        toolbar: {
                          show: false,
                        },
                      },
                      dataLabels: {
                        enabled: false,
                      },
                      plotOptions: {
                        pie: {
                          donut: {
                            size: "80%", // chart thickness
                            labels: {
                              show: false,
                            },
                          },
                        },
                      },
                      legend: {
                        show: false,
                      },
                      colors: ["#04BE38", "#CDC9C9"],
                    }}
                    series={[96, 4]} // filled-empty percentage
                    type="donut"
                  />

                  {/* percentage text in the middle of the chart */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "51%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    96 %
                  </div>
                </div>

                {/* download icon */}
                <Box position={"absolute"} bottom={"0.1rem"} right={"0.1rem"}>
                  <IconButton>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton>
                </Box>
              </Bbox>
            </Grid>

            {/* defaulter section */}
            <Grid item xs={6} style={{ width: 530, height: 235 }}>
              <Bbox
                height={"11rem"}
                bgcolor={"primary.light"}
                borderRadius={1}
                p={1}
                display="flex"
                justifyContent="flex-start"
                alignItems="stretch"
                position={"relative"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  flex={1}
                  gap={3}
                >
                  <Box>
                    <Typography
                      fontSize={"1.6rem"}
                      color={"primary.dark"}
                      fontWeight={600}
                    >
                      {/* {charts.completed} */}
                    </Typography>
                    <Typography color={"primary.main"}>
                      defaulter section
                    </Typography>
                  </Box>

                  {/* <Icon
                    icon={"teenyicons:tick-circle-solid"}
                    color="#3B98C4"
                    fontSize={"4rem"}
                  /> */}
                </Box>
                <Box position={"absolute"} bottom={"0.2rem"} right={"0.5rem"}>
                  {/* <IconButton onClick={() => download("onboarding_completed")}>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton> */}
                </Box>
              </Bbox>
            </Grid>
          </Grid>

          {/* right section */}
          <Grid container spacing={1} flex={2}>
            {/* gender distribution section */}
            <Grid item xs={8} style={{ width: 400, height: 235 }}>
              <Bbox
                height={"9rem"}
                borderRadius={1}
                p={3}
                px={10}
                display="flex"
                justifyContent="flex-start"
                alignItems="stretch"
                position={"relative"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  flex={1}
                  gap={3}
                >
                  <Box>
                    <Typography
                      fontSize={"1.6rem"}
                      color={"primary.dark"}
                      fontWeight={600}
                    >
                      {/* {charts.completed} */}
                    </Typography>
                    <Typography color={"primary.main"}>
                      gender distribution section
                    </Typography>
                  </Box>

                  {/* <Icon
                    icon={"teenyicons:tick-circle-solid"}
                    color="#3B98C4"
                    fontSize={"4rem"}
                  /> */}
                </Box>
                <Box position={"absolute"} bottom={"0.2rem"} right={"0.5rem"}>
                  {/* <IconButton onClick={() => download("onboarding_completed")}>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton> */}
                </Box>
              </Bbox>
            </Grid>

            {/* cultural diversity section */}
            <Grid item xs={8} style={{ width: 400, height: 235 }}>
              <Bbox
                height={"9rem"}
                borderRadius={1}
                p={3}
                px={10}
                display="flex"
                justifyContent="flex-start"
                alignItems="stretch"
                position={"relative"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  flex={1}
                  gap={3}
                >
                  <Box>
                    <Typography
                      fontSize={"1.6rem"}
                      color={"primary.dark"}
                      fontWeight={600}
                    >
                      {/* {charts.completed} */}
                    </Typography>
                    <Typography color={"primary.main"}>
                      cultural diversity section
                    </Typography>
                  </Box>

                  {/* <Icon
                    icon={"teenyicons:tick-circle-solid"}
                    color="#3B98C4"
                    fontSize={"4rem"}
                  /> */}
                </Box>
                <Box position={"absolute"} bottom={"0.2rem"} right={"0.5rem"}>
                  {/* <IconButton onClick={() => download("onboarding_completed")}>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton> */}
                </Box>
              </Bbox>
            </Grid>
          </Grid>
        </Box>
      </Bbox>

      <ToastContainer />
    </RevealCard>
  );
};

export default StudentDashboard;
