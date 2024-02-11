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

const StudentDashboard = () => {
  return (
    <RevealCard>
      <Bbox borderRadius={2} overflow={"hidden"}>
        {/* dashboard text box */}
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

        {/* left input */}
        <Box
          display={"flex"}
          gap={3}
          flexDirection={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "center" }}
          p={3}
          pb={2}
        >
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
            {/* academic year */}
            <FormControl fullWidth>
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

            {/* class */}
            <FormControl fullWidth>
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

            {/* section */}
            <FormControl fullWidth>
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

            {/* status */}
            <FormControl fullWidth>
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

          {/* grid */}
          <Grid container spacing={2} flex={2}>
            <Grid item xs={6}>
              <Bbox
                height={"9rem"}
                bgcolor={"primary.light"}
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
                  flex={1}
                  justifyContent={"space-between"}
                  gap={3}
                >
                  <Box>
                    <Typography
                      fontSize={"1.6rem"}
                      color={"primary.dark"}
                      fontWeight={600}
                    >
                      {/* {charts.interview} */}
                    </Typography>
                    <Typography color={"primary.main"}>
                      Candidates selected for Test/Interview
                    </Typography>
                  </Box>

                  {/* <Icon
                    icon={"fluent:note-edit-24-filled"}
                    color="#3B98C4"
                    fontSize={"4rem"}
                  /> */}
                </Box>
                <Box position={"absolute"} bottom={"0.2rem"} right={"0.5rem"}>
                  {/* <IconButton onClick={() => download("candidates_selected")}>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton> */}
                </Box>
              </Bbox>
            </Grid>
            <Grid item xs={6}>
              <Bbox
                height={"9rem"}
                bgcolor={"secondary.light"}
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
                  flex={1}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={3}
                >
                  <Box>
                    <Typography
                      fontSize={"1.6rem"}
                      color={"secondary.dark"}
                      fontWeight={600}
                    >
                      {/* {charts.in_merit} */}
                    </Typography>
                    <Typography color={"secondary.main"}>
                      Candidates in Merit
                    </Typography>
                  </Box>

                  {/* <Icon
                    icon={"clarity:list-solid"}
                    color="#91431F"
                    fontSize={"4rem"}
                  /> */}
                </Box>
                <Box position={"absolute"} bottom={"0.2rem"} right={"0.5rem"}>
                  {/* <IconButton onClick={() => download("candidates_in_merit")}>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton> */}
                </Box>
              </Bbox>
            </Grid>
            <Grid item xs={6}>
              <Bbox
                height={"9rem"}
                bgcolor={"secondary.light"}
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
                      color={"secondary.dark"}
                      fontWeight={600}
                    >
                      {/* {charts.in_review} */}
                    </Typography>
                    <Typography color={"secondary.main"}>
                      Onboarding In-Review
                    </Typography>
                  </Box>

                  {/* <Icon
                    icon={"mdi:file-document-box-search"}
                    color="#91431F"
                    fontSize={"4rem"}
                  /> */}
                </Box>
                <Box position={"absolute"} bottom={"0.2rem"} right={"0.5rem"}>
                  {/* <IconButton onClick={() => download("candidate_in_review")}>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton> */}
                </Box>
              </Bbox>
            </Grid>
            <Grid item xs={6}>
              <Bbox
                height={"9rem"}
                bgcolor={"primary.light"}
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
                      Onboarding Completed
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

      {/* <ToastContainer /> */}
    </RevealCard>
  );
};

export default StudentDashboard;
