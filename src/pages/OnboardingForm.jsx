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
  const [activities, setActivities] = useState([]);
  const [activityLevel, setActivityLevel] = useState("");
  const [activityCertificate, setActivityCertificate] = useState(null);
  const [nccEnrolled, setNccEnrolled] = useState(false);
  const [hobbies, setHobbies] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleBloodGroupChange = (event) => {
    setBloodGroup(event.target.value);
  };

  const handleOtherFieldChange = (event) => {
    setOtherField(event.target.value);
  };

  const handleActivitiesChange = (event) => {
    setActivities(event.target.value);
  };

  const handleActivityLevelChange = (event) => {
    setActivityLevel(event.target.value);
  };

  const handleActivityCertificateChange = (event) => {
    setActivityCertificate(event.target.files[0]);
  };

  const handleNccEnrolledChange = (event) => {
    setNccEnrolled(event.target.value === "yes");
  };

  const handleHobbiesChange = (event) => {
    setHobbies(event.target.value);
  };

  const activitiesList = [
    { id: 1, name: "Football" },
    { id: 2, name: "Cricket" },
    { id: 3, name: "Badminton" },
    { id: 4, name: "Tennis" },
    { id: 5, name: "Table Tennis" },
    { id: 6, name: "Hockey" },
    { id: 7, name: "Dance" },
    { id: 8, name: "Music" },
    { id: 9, name: "Painting" },
    { id: 10, name: "Sculpture" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add the new state variable to the form data
    const formData = new FormData();
    formData.append("rollNum", rollNum);
    formData.append("candidate", JSON.stringify(candidate));
    formData.append("bloodGroup", bloodGroup);
    formData.append("otherField", otherField);
    formData.append("physician", physician);
    formData.append("activities", activities.join(","));
    formData.append("activityLevel", activityLevel);
    formData.append("activityCertificate", activityCertificate);
    formData.append("nccEnrolled", nccEnrolled);
    formData.append("hobbies", hobbies);

    try {
      // const response = await api.post("/onboarding", formData);
      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error("Error submitting form.");
    }
  };

  return (
    <Box>
      <Typography
        p={2}
        fontSize={"1.5rem"}
        fontWeight={500}
        bgcolor={"primary.main"}
        color={"whitesmoke"}
        position={"fixed"}
        top={0}
        width={"100%"}
        zIndex={5}
      >
        Onboarding Form
      </Typography>

      <Box p={2} mt={8}>
        <ToastContainer />
        <Box display={"flex"} flexDirection={"column"} gap={2}>
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
              Upload Category Certificate for {setCandidate?.caste}
            </Typography>
            <Button size="small" variant="contained" component="label">
              <input type="file" hidden />
              Category Certificate
            </Button>
          </Box>
          {/* dob */}
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography>Upload Date of Birth</Typography>
            <Button size="small" variant="contained" component="label">
              <input type="file" hidden />
              Adhar (preferable) / Birth Cirtificate
            </Button>
          </Box>
          {/* blood group */}
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

          {/* migration */}
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography>Upload Migration & Transfer Cirtificate</Typography>
            <Button size="small" variant="contained" component="label">
              <input type="file" hidden />
              Upload
            </Button>
          </Box>

          <Typography
            mt={2}
            fontSize={"1.3rem"}
            fontWeight={500}
            textTransform={"capitalize"}
          >
            Extra Curricular Activities
          </Typography>

          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography>Activities & Sports</Typography>
            <FormControl sx={{ width: "15rem" }} variant="outlined">
              <InputLabel id="activities-label">Activities & Sports</InputLabel>
              <Select
                multiple
                value={activities}
                onChange={handleActivitiesChange}
                label="Activities & Sports"
              >
                {activitiesList.map((activity) => (
                  <MenuItem key={activity.id} value={activity.id}>
                    {activity.name}
                  </MenuItem>
                ))}

                <MenuItem value="others">Others</MenuItem>
              </Select>
            </FormControl>

            {activities.includes("others") && (
              <TextField label="Mention other activities" />
            )}
          </Box>

          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography>Level</Typography>
            <FormControl sx={{ width: "10rem" }} variant="outlined">
              <InputLabel id="activity-level-label">Level</InputLabel>
              <Select
                value={activityLevel}
                onChange={handleActivityLevelChange}
                label="Level"
              >
                <MenuItem value="international">International</MenuItem>
                <MenuItem value="national">National</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography>Upload relevant certificate</Typography>
            <Button size="small" variant="contained" component="label">
              <input
                type="file"
                hidden
                onChange={handleActivityCertificateChange}
              />
              Upload Certificate
            </Button>
          </Box>

          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography>
              Are you enrolled in National Cadet Corps(NCC)
            </Typography>
            <FormControl sx={{ width: "10rem" }} variant="outlined">
              <Select
                value={nccEnrolled ? "yes" : "no"}
                onChange={handleNccEnrolledChange}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography>Hobbies/Interested in</Typography>
            <TextField value={hobbies} onChange={handleHobbiesChange} />
          </Box>

          <Box display={"flex"} justifyContent={"center"} mt={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OnboardingForm;
