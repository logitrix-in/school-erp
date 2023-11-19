import { Icon } from "@iconify/react";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
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

const TestcenterDashboard = () => {
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
    cleared: 0,
    failed: 0,
  });

  function getValues() {
    api
      .put("/admission/screening/", filter)
      .then((response) => {
        const data = response.data;
        ;
        setCharts({
          total: data.total_application,
          cleared: data.screened,
          failed: data.failed,
        });
      })
      .catch((error) => {
        ;
      });
  }

  useEffect(() => {
    getValues();
    return () => clearInterval();
  }, []);

  useEffect(() => {
    ;
    getValues();
  }, [filter]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    api.get("/admission/application/manage-application/").then((res) => {
      const classes = res.data.map((d) => d.class_name);
      ;
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
          gap={2}
          flexDirection={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "stretch" }}
          p={3}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={'stretch'}
            gap={"2rem"}
            bgcolor={"white"}
            // width={"30rem"}
            flex={1}
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
                sx={{width:'100%'}}
                label="Start Date"
                onChange={(e) => setStartDate(e)}
                format="DD MMM YYYY"
                />
              <DatePicker
                sx={{width:'100%'}}
                format="DD MMM YYYY"
                label="End Date"
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
          </Box>

          <Bbox
            p={2}
            flex={0.7}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={1}
            sx={{
              background: "linear-gradient(to right, #2C7BA0, #9BD9F4)",
            }}
            textAlign={"center"}
            color={"white"}
          >
            <Typography fontSize={"1rem"} fontWeight={300}>
              Total
            </Typography>
            <Typography fontSize={"1.3rem"} fontWeight={400}>
              Application Recieved
            </Typography>
            <Typography fontSize={"2.5rem"} fontWeight={600}>
              {charts.total}
            </Typography>
          </Bbox>

          <Box display={"flex"} flexDirection={"column"} gap={2} flex={1}>
            <Box
              flex={1}
              borderRadius={1}
              p={2}
              display={"flex"}
              flexDirection={"column"}
              boxShadow={"0 3px 12px -1px rgba(0,0,0,0.4)"}
              border={"1px solid black"}
              borderColor={"primary.main"}
            >
              <Box display={"flex"}>
                <Box flex={2}>
                  <Typography
                    fontSize={"4rem"}
                    fontWeight={500}
                    color={"primary.main"}
                    lineHeight={1.2}
                  >
                    {charts.cleared}
                  </Typography>
                  <Typography fontSize={"1.5rem"} color={"primary.main"}>
                    Cleared
                  </Typography>
                </Box>
                <Icon
                  icon={"mdi:account-check"}
                  fontSize={"7rem"}
                  color="#3B98C4"
                />
              </Box>
              <Typography fontSize={"0.8rem"} color={"primary.main"}>
                {((charts.cleared / charts.total) * 100).toFixed(2)}% of the
                applicants have cleared the screening proccess
              </Typography>
            </Box>
            <Box
              flex={1}
              borderRadius={1}
              p={2}
              display={"flex"}
              boxShadow={"0 3px 12px -1px rgba(0,0,0,0.4)"}
              flexDirection={"column"}
              border={"1px solid black"}
              borderColor={"secondary.main"}
            >
              <Box display={"flex"}>
                <Box flex={2}>
                  <Typography
                    fontSize={"4rem"}
                    fontWeight={500}
                    color={"#B34A19"}
                    lineHeight={1.2}
                  >
                    {charts.failed}
                  </Typography>
                  <Typography fontSize={"1.5rem"} color={"secondary.main"}>
                    Rejected
                  </Typography>
                </Box>
                <Icon
                  icon={"mdi:account-cancel"}
                  fontSize={"6rem"}
                  color="#C4673B"
                />
              </Box>
              <Typography fontSize={"0.8rem"} color={"secondary.main"}>
                {((charts.failed / charts.total) * 100).toFixed(2)}% of the
                applicants have failed to clear the screening proccess
              </Typography>
            </Box>
          </Box>
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default TestcenterDashboard;
