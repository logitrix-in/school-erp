import { Icon } from "@iconify/react";
import {
  Box,
  Button,
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
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import api from "../../../config/api";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";

const OnboardingDashboard = () => {
  const curYear = new Date().getFullYear();
  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;

  const [filter, setFilter] = useState({
    academic_year: academicYear,
    start_date: "",
    end_date: "",
    class: [],
  });

  const [classes, setClasses] = useState([]);
  const [charts, setCharts] = useState({
    total: 0,
    screenedPending: 0,
  });

  function getValues() {
    api
      .put("/admission/screening/", filter)
      .then((response) => {
        const data = response.data;
        setCharts({
          total: data.total_application,
          screenedPending: data.screened_pending,
        });
      })
      .catch((error) => {});
  }

  useEffect(() => {
    getValues();
    return () => clearInterval();
  }, []);

  useEffect(() => {
    getValues();
  }, [filter]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    api.get("/admission/application/manage-application/").then((res) => {
      const classes = res.data.map((d) => d.class_name);
      setClasses(classes);
    });
  }, []);

  const [acYear, setAcYear] = useState(academicYear);
  const [curClass, setClass] = useState([]);

  useEffect(() => {
    if (endDate == "") setEndDate(startDate);

    const _filter = {
      academic_year: acYear,
      start_date: startDate && new Date(startDate).toLocaleDateString("en-CA"),
      end_date: endDate && new Date(endDate).toLocaleDateString("en-CA"),
      class: curClass,
    };
    setFilter(_filter);
  }, [acYear, curClass, startDate, endDate]);

  const handleClassChange = (e) => {
    const {
      target: { value },
    } = e;
    setClass(typeof value === "string" ? value.split(",") : value);
  };

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
                sx={{ width: "100%" }}
                label="Start Date"
                onChange={(e) => setStartDate(e)}
                format="DD MMM, YYYY"
              />
              <DatePicker
                format="DD MMM, YYYY"
                label="End Date"
                sx={{ width: "100%" }}
                onChange={(e) => setEndDate(e)}
              />
            </Box>

            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                multiple
                value={curClass}
                onChange={handleClassChange}
                input={<OutlinedInput label="class" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {classes?.map((name) => (
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
          </Bbox>

          <Grid container spacing={2} flex={2}>
            <Grid item xs={6}>
              <Bbox
                height={"9rem"}
                bgcolor={"primary.light"}
                borderRadius={1}
                p={2}
                display="flex"
                justifyContent="center"
                alignItems="stretch"
                position={"relative"}
              >
                <Box display={"flex"} alignItems={"center"} gap={3}>
                  <Box>
                    <Typography
                      fontSize={"1.6rem"}
                      color={"primary.dark"}
                      fontWeight={600}
                    >
                      256
                    </Typography>
                    <Typography color={"primary.main"}>
                      Candidates selected for Test/Interview
                    </Typography>
                  </Box>

                  <Icon
                    icon={"fluent:note-edit-24-filled"}
                    color="#3B98C4"
                    fontSize={"4rem"}
                  />
                </Box>
                <Box position={"absolute"} bottom={"0.2rem"} right={"0.5rem"}>
                  <IconButton onClick={() => alert("clicked")}>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton>
                </Box>
              </Bbox>
            </Grid>
            <Grid item xs={6}>
              <Bbox
                height={"9rem"}
                bgcolor={"secondary.light"}
                borderRadius={1}
                p={2}
              ></Bbox>
            </Grid>
            <Grid item xs={6}>
              <Bbox
                height={"9rem"}
                bgcolor={"secondary.light"}
                borderRadius={1}
                p={2}
              ></Bbox>
            </Grid>
            <Grid item xs={6}>
              <Bbox
                height={"9rem"}
                bgcolor={"primary.light"}
                borderRadius={1}
                p={2}
              ></Bbox>
            </Grid>
          </Grid>
        </Box>
        <Box ml={3} mb={3}>
          <Button
            sx={{ px: 5 }}
            size="small"
            color="secondary"
            variant="contained"
          >
            Add / Remove candidate to/from Merit List
          </Button>
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default OnboardingDashboard;
