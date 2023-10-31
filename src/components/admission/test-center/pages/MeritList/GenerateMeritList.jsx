import React from "react";
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

const GenerateMeritList = () => {
  return (
    <Bbox borderRadius={1}>
      <Typography fontSize={"1rem"} fontWeight={500} p={2}>
        Generate Merit List
      </Typography>
      <Divider />
      <Box p={2}>
        <FormControl sx={{ width: "10rem" }}>
          <InputLabel id="demo-simple-select-label">Class</InputLabel>
          <Select label="Class" defaultValue={10}>
            <MenuItem value={10}>I</MenuItem>
            <MenuItem value={20}>II</MenuItem>
            <MenuItem value={30}>III</MenuItem>
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
              control={<Checkbox />}
              onChange={(_, v) => {}}
              label={e}
            />
          ))}
        </Box>
        <Box mt={3}>
          <Typography fontSize={"1rem"} fontWeight={500}>
            Order Merit List By
          </Typography>

          <RadioGroup onChange={(_, v) => console.log(v)}>
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
        <Button sx={{mt:3}} variant="contained">Generate Merit List</Button>

      </Box>
    </Bbox>
  );
};

export default GenerateMeritList;
