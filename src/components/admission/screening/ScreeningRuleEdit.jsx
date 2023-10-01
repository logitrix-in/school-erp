import React, { useEffect, useRef, useState } from "react";
import Bbox from "../../UiComponents/Bbox";
import {
  Box,
  Button,
  ButtonBase,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import api from "../../../config/api";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import { InfoRounded } from "@mui/icons-material";

const ScreeningRuleEdit = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    scrollToTop();
    api.get("/admission/screening/").then((res) => {
      setClasses(res.data);
    });
  }, []);

  function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // dynamic criteria

  const available_crits = [
    "age",
    "board",
    "previous_percent",
    "specialization",
  ];

  const specializationOptions = ["Science", "Arts", "Commerce"];
  const boardOptions = ["CBSE", "ICSE", "State Board"];

  const option = {
    age: {
      label: "Age",
      type: "number",
    },
    board: {
      label: "Board",
      type: "select",
      options: boardOptions,
    },
    previous_percent: {
      label: "Previous Percentage",
      type: "number",
    },
    specialization: {
      label: "Specialization",
      type: "select",
      options: specializationOptions,
    },
  };

  const [availCrits, setAvailCrits] = useState(available_crits);
  const [crit, setCrit] = useState([]);

  function addNew() {
    const list = [...crit];
    list.push({
      criteria: "",
      operator: "",
      value: [],
    });
    setCrit(list);
  }

  function remove(index) {
    const updatedItems = [...crit.slice(0, index), ...crit.slice(index + 1)];
    setCrit(updatedItems);
  }

  function handleChange(e, row) {
    const { name, value } = e.target;

    if (
      crit[row].criteria == "previous_percent" &&
      name == "value" &&
      value > 100
    )
      return toast.error("Percentage can't be more than 100%");

    if (crit[row].criteria == "age" && name == "value" && value > 50)
      return toast.error("Age can't be more than 50");

    const temp = [...crit];
    if (name == "criteria")
      temp[row].value = option[value].type == "select" ? [] : "";
    temp[row][name] = value;
    setCrit(temp);
  }

  useEffect(() => {
    console.log(crit);
  }, [crit]);

  return (
    <Bbox display={"flex"} borderRadius={1}>
      <ToastContainer />
      {/* left */}
      <Box
        display={"flex"}
        gap={1}
        flexDirection={"column"}
        sx={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}
        p={2}
      >
        {classes.length == 0
          ? new Array(12)
              .fill(0)
              .map((c, idx) => (
                <Skeleton key={idx} height={50} width={160}></Skeleton>
              ))
          : classes.map((cl, idx) => (
              <ButtonBase
                key={idx}
                sx={{
                  padding: 1,
                  px: 2,
                  bgcolor: `${
                    selectedClass == cl.Class ? "primary.main" : "white"
                  }`,
                  color: `${
                    selectedClass != cl.Class ? "primary.main" : "white"
                  }`,
                  border: "1px solid blue",
                  borderColor: "primary.main",
                  borderRadius: 1,
                }}
                onClick={() => {
                  setSelectedClass(cl.Class);
                  scrollToTop();
                }}
              >
                <Typography>Class {cl.Class}</Typography>
              </ButtonBase>
            ))}
      </Box>

      {/* right */}
      <Box p={2} flex={1}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            fontSize={"1rem"}
            fontWeight={"500"}
            bgcolor={"primary.light"}
            p={0.5}
            px={2}
            borderRadius={1}
          >
            {selectedClass
              ? `Set screening rule for class ${selectedClass
                  ?.toString()
                  .replace("-", " ")}`
              : "Select a class to edit screenung rules"}
          </Typography>

          {selectedClass && crit.length < availCrits.length && (
            <Box ml={"auto"}>
              <Tooltip
                placement="bottom-end"
                title={
                  <pre style={{ padding: '1rem', width: '20rem' }}>
                    {JSON.stringify(crit, null, 4)}
                  </pre>
                }
              >
                <IconButton>
                  <InfoRounded />
                </IconButton>
              </Tooltip>
              <Button size="small" variant="contained" onClick={addNew}>
                Add New criteria
              </Button>
            </Box>
          )}
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={1} mt={2}>
          {crit.map((c, idx) => (
            <Grid container key={idx} spacing={1}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Criteria
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Criteria"
                    name="criteria"
                    value={c.criteria}
                    onChange={(e) => handleChange(e, idx)}
                  >
                    {availCrits.map((ac, idx) => (
                      <MenuItem
                        key={idx}
                        value={ac}
                        disabled={crit.find((b) => b.criteria == ac) != null}
                      >
                        {ac}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Operator
                  </InputLabel>
                  {/* number */}
                  {option[c.criteria]?.type != "select" && (
                    <Select
                      value={c.operator}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Operator"
                      name="operator"
                      onChange={(e) => handleChange(e, idx)}
                    >
                      <MenuItem value={"eq"}>Equals To</MenuItem>
                      <MenuItem value={"nt"}>Not Equals To</MenuItem>
                      <MenuItem value={"gt"}>Greater Than</MenuItem>
                      <MenuItem value={"gte"}>Greater Than Equals To</MenuItem>
                      <MenuItem value={"lt"}>Less Than</MenuItem>
                      <MenuItem value={"lte"}>Less Than Equals To</MenuItem>
                    </Select>
                  )}
                  {/* select */}
                  {option[c.criteria]?.type == "select" && (
                    <Select
                      value={c.operator}
                      labelId="demo-simple-select-label"
                      name="operator"
                      onChange={(e) => handleChange(e, idx)}
                      id="demo-simple-select"
                      label="Operator"
                    >
                      <MenuItem value={"eq"}>Equals To</MenuItem>
                      <MenuItem value={"nt"}>Not Equals To</MenuItem>
                    </Select>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {/* select */}
                {option[c.criteria]?.type == "select" && (
                  <FormControl fullWidth>
                    <InputLabel>Values</InputLabel>
                    <Select
                      label="values"
                      multiple
                      name="value"
                      value={c.value}
                      onChange={(e) => handleChange(e, idx)}
                    >
                      {option[c.criteria]?.options.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                {/* number */}
                {option[c.criteria]?.type != "select" && (
                  <TextField
                    fullWidth
                    type="number"
                    name="value"
                    label="value"
                    value={c.value}
                    onChange={(e) => handleChange(e, idx)}
                  />
                )}
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => remove(idx)}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Box>
    </Bbox>
  );
};

export default ScreeningRuleEdit;
