import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import api from "../config/api";
import { ToastContainer, toast } from "react-toastify";

const OnboardingForm = () => {
  const [rollNum, setRollNum] = useState();
  const [candidate, setCandidate] = useState(null);

  const [bloodGroup, setBloodGroup] = useState("");
  const [otherField, setOtherField] = useState("");
  const [physician, setPhysician] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleBloodGroupChange = (event) => {
    setBloodGroup(event.target.value);
  };

  const handleOtherFieldChange = (event) => {
    setOtherField(event.target.value);
  };

  return (
    <Box>
      <Typography
        p={2}
        fontSize={"1.5rem"}
        fontWeight={500}
        bgcolor={"primary.main"}
        color={"whitesmoke"}
      >
        Onboarding Form
      </Typography>

      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Roll Number"
              size="small"
              onChange={(e) => setRollNum(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={() => {
                api
                  .get("/admission/application/search-by-roll/", {
                    params: {
                      roll: rollNum,
                    },
                  })
                  .then((e) => {
                    console.log(e.data);
                    setCandidate(e.data);
                  })
                  .catch((e) => {
                    toast.error(e.response.data.message);
                  });
              }}
            >
              Fetch Profile
            </Button>
          </Grid>
          <ToastContainer />
        </Grid>
        <Box mt={4} display={"flex"} flexDirection={"column"} gap={2}>
          <Box>
            <Typography fontSize={"1.3rem"} fontWeight={500}>
              {candidate?.name}
            </Typography>
            <Typography fontSize={"0.9rem"} fontWeight={500}>
              {candidate?.email}
            </Typography>
          </Box>
          {/* category */}
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography>
              Upload Catergory Certificate for {setCandidate?.caste}
            </Typography>
            <Button size="small" variant="contained" component="label">
              <input type="file" hidden />
              Category Cirtificate
            </Button>
          </Box>
          {/* category */}
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography>Upload Date of Birth</Typography>
            <Button size="small" variant="contained" component="label">
              <input type="file" hidden />
              Adhar (preferable) / Birth Cirtificate
            </Button>
          </Box>
          {/* category */}
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography>Blood Group</Typography>
            <FormControl sx={{ width: "15rem" }} variant="outlined">
              <InputLabel id="blood-group-label">Blood Group</InputLabel>
              <Select
                value={bloodGroup}
                onChange={handleBloodGroupChange}
                label="Blood Group"
              >
                {bloodGroups.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            {bloodGroup == "other" && <TextField label="Enter Blood Group" />}
          </Box>
          {/* mother tonge */}
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography>Mother Tongue</Typography>
            <TextField />
          </Box>
          {/* physician */}
          {true && (
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Typography>
                Enter Physicians Contact Number ( will be used only in case of
                emergency )
              </Typography>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment sx={{ mt: 0.3 }} position="start">
                      +91
                    </InputAdornment>
                  ),
                }}
                type="number"
                value={physician}
                sx={{ width: "10rem" }}
                onChange={(e) =>
                  e.target.value.length <= 10 && setPhysician(e.target.value)
                }
              />
            </Box>
          )}

          {/* Signeture */}
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography>Upload Signeture & Thumb Impression</Typography>
            <Button size="small" variant="contained" component="label">
              <input type="file" hidden />
              Upload
            </Button>
          </Box>

          {/* category */}
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography>Upload Migration & Transfer Cirtificate</Typography>
            <Button size="small" variant="contained" component="label">
              <input type="file" hidden />
              Upload
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OnboardingForm;
