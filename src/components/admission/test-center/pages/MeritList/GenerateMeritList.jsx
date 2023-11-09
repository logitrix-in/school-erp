import React, { useEffect, useState } from "react";
import Bbox from "../../../../UiComponents/Bbox";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import api from "../../../../../config/api";
import { DataGrid } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";

const GenerateMeritList = () => {
  const initPayload = {
    applyingFor: "IV",
    "Candidate Name": false,
    "Applicant No": true,
    "Test Score": true,
    Interview: false,
    "Test + Interview": false,
    Gender: false,
    Caste: false,
    orderBy: "Candidate Name",
  };

  const [payload, setPayload] = useState(initPayload);
  const [classes, setClasses] = useState([]);

  const [data, setData] = useState(null);

  const handleChange = (name, value) => {
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    api
      .get("/admission/get-all-classes/")
      .then((res) => {
        setClasses(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    api.get("/admission/test-center/evaluation/merit-list/").then((res) => {
      console.log(res.data);
      setPayload(
        res.data?.criteria.find((cl) => cl.applyingFor == payload.applyingFor)
      );
    });
  }, []);

  useEffect(() => {
    console.log(payload);
  }, [payload]);

  const [generateLoading, setGenerateLoading] = useState(false);

  return (
    <Bbox borderRadius={1}>
      <Typography fontSize={"1rem"} fontWeight={500} p={2}>
        Generate Merit List
      </Typography>
      <Divider />
      <Box p={2}>
        <FormControl sx={{ width: "10rem" }}>
          <InputLabel id="demo-simple-select-label">Class</InputLabel>
          <Select
            label="Class"
            onChange={(e) => {
              setData(null);
              handleChange("applyingFor", e.target.value);
              api
                .get("/admission/test-center/evaluation/merit-list/")
                .then((res) => {
                  console.log(res.data);
                  setPayload(
                    res.data?.criteria.find(
                      (cl) => cl.applyingFor == e.target.value
                    )
                  );
                });
            }}
            value={payload.applyingFor}
          >
            {classes.map((cl, idx) => (
              <MenuItem key={idx} value={cl}>
                {cl}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box mt={4}>
          <Typography fontSize={"1rem"} fontWeight={500}>
            Select Fields to display
          </Typography>

          {[
            "Candidate Name",
            "Applicant No",
            "Test Score",
            "Interview",
            "Test + Interview",
            "Gender",
            "Caste",
          ].map((e, i) => (
            <FormControlLabel
              key={i}
              control={<Checkbox checked={payload[e]} />}
              onChange={(_, v) => {
                handleChange(e, v);
              }}
              checked={payload[e]}
              label={e}
            />
          ))}
        </Box>
        <Box mt={3}>
          <Typography fontSize={"1rem"} fontWeight={500}>
            Order Merit List By
          </Typography>

          <RadioGroup
            onChange={(_, v) => handleChange("orderBy", v)}
            value={payload.orderBy}
          >
            {["Assessment Score", "Applicant No", "Candidate Name"].map(
              (e, i) => (
                <FormControlLabel
                  key={i}
                  value={e}
                  control={<Radio />}
                  label={e}
                />
              )
            )}
          </RadioGroup>
        </Box>
        <LoadingButton
          loading={generateLoading}
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() => {
            setGenerateLoading(true);
            api
              .post("/admission/test-center/evaluation/merit-list/", payload)
              .then((res) => {
                console.log(res.data);
                setData(res.data.data);
              })
              .catch((err) => console.log(err))
              .finally(() => setGenerateLoading(false));
          }}
        >
          Generate Merit List
        </LoadingButton>

        <Box mt={3}>
          {data && (
            <DataGrid
              rows={data.map((e, i) => ({ ...e, id: i }))}
              columns={Object.keys(data[0]).map((e, i) => ({
                field: e,
                headerName: e.replaceAll("_", " "),
                flex: 1,
              }))}
            />
          )}
        </Box>
      </Box>
    </Bbox>
  );
};

export default GenerateMeritList;
