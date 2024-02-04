import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../config/api";
import { Controller, useForm } from "react-hook-form";
// import { candidateType } from "../utils/candidateType";
import dayjs from "dayjs";
import ReignsSelect from "../components/UiComponents/ReignsSelect";
import { Icon } from "@iconify/react";

const OnboardingForm = () => {
  // Retrive Candidate

  const [searchParams, setSearchParams] = useSearchParams();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    api
      .get("/admission/application/search-by-id/", {
        params: {
          id: searchParams.get("appid"),
        },
      })
      .then((res) => {
        setCandidate(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  // Form Handling using react-hook-form

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      blood_group: "",
    },
  });

  const err = (name) => {
    return {
      error: !!errors[name],
      helperText: errors[name]?.message,
    };
  };

  const submit = (e) => {
    console.log(e);
  };

  const navigate = useNavigate();

  return (
    <Box>
      <Box
        bgcolor={"primary.main"}
        p={2}
        display={"flex"}
        justifyContent={"space-between"}
        gap={2}
        alignItems={"center"}
      >
        <Typography fontSize={"1.2rem"} color={"white"}>
          Onboarding Form
        </Typography>
        {searchParams.get("admin") == "true" && (
          <Box
            onClick={() => navigate(-1)}
            sx={{
              cursor: "pointer",
              color: "white",
              ":hover": {
                color: "#2b2b2b !important",
              },
            }}
          >
            <Icon icon="fa:close" fontSize={"1.2rem"} color="inherit" />
          </Box>
        )}
      </Box>
      <Box p={2}>
        <form onSubmit={handleSubmit(submit)}>
          <Stack alignItems={"center"} p={3}>
            <img
              src={candidate?.candidate_details.profile_photo}
              height={"130px"}
              style={{
                objectFit: "cover",
              }}
            />
            <Typography mt={2} fontWeight={600} fontSize={"1rem"}>
              Application No. {candidate?.application_id}
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Stack flex={1} spacing={2}>
              <PersonalDetails
                candidate={candidate}
                register={register}
                err={err}
                control={control}
              />
              <ExtraCurricularActivities
                candidate={candidate}
                register={register}
                err={err}
              />
              <ApplicationDetails
                candidate={candidate}
                register={register}
                err={err}
              />
              <AdditionalDetails
                candidate={candidate}
                register={register}
                err={err}
              />
            </Stack>
            <Stack flex={1} spacing={2}>
              <ParentGuardianDetails
                candidate={candidate}
                register={register}
                err={err}
              />
              <AddressDetails
                candidate={candidate}
                register={register}
                err={err}
              />
              <FeeDetails candidate={candidate} register={register} err={err} />
            </Stack>
          </Stack>
          <Button fullWidth type="submit" sx={{ mt: 2 }} variant="contained">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

const show = (label, value, size = "0") => {
  return (
    <Stack direction={"row"} spacing={1}>
      <Typography textTransform={"capitalize"} minWidth={size + "px"}>
        {label} :
      </Typography>
      <Typography
        textTransform={"capitalize"}
        flex={1}
        sx={{
          wordBreak: "break-all",
        }}
        fontWeight={600}
      >
        {value}
      </Typography>
    </Stack>
  );
};

// Left side forms

const PersonalDetails = ({ candidate, register, err, control }) => {
  const c = candidate;
  const p = c?.candidate_details;

  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
      >
        Personal Details
      </Typography>

      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        mt={1}
        alignItems={"center"}
      >
        <Grid item xs={12}>
          {show(
            "Candidate's Name",
            `${p?.first_name} ${p?.middle_name ?? ""} ${p?.last_name}`
          )}
        </Grid>
        <Grid item sm={12} lg={6}>
          {show("Contact Number", p?.contact_number)}
        </Grid>
        <Grid item sm={12} lg={6}>
          {show("Email", p?.email)}
        </Grid>
        <Grid item xs={6}>
          {show("Nationility", p?.nationality)}
        </Grid>

        <Grid item xs={6}>
          {show("Religion", p?.religion)}
        </Grid>

        <Grid item xs={6}>
          {show("Date of Birth", dayjs(p?.dob).format("DD MMM YYYY"))}
        </Grid>

        <Grid item xs={6}>
          {show("Category", p?.category)}
        </Grid>

        <Grid item xs={6}>
          {show("Gender", p?.gender)}
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="blood_group"
            rules={{
              required: "Blood Group is required",
            }}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Blood Group"
                {...err("blood_group")}
                {...field}
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (name, idx) => (
                    <MenuItem key={idx} value={name}>
                      {name}
                    </MenuItem>
                  )
                )}
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
const ExtraCurricularActivities = ({ candidate, register, err }) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
      >
        Extra Curricular Activities
      </Typography>
    </Box>
  );
};
const ApplicationDetails = ({ candidate, register, err }) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
      >
        Application Details
      </Typography>
    </Box>
  );
};

const AdditionalDetails = ({ candidate, register, err }) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
      >
        Additional Details
      </Typography>
    </Box>
  );
};

// Right side forms

const ParentGuardianDetails = ({ candidate, register, err }) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
      >
        Parent/Guardian Details
      </Typography>
    </Box>
  );
};
const AddressDetails = ({ candidate, register, err }) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
      >
        Address Details
      </Typography>
    </Box>
  );
};
const FeeDetails = ({ candidate, register, err }) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
      >
        Fee Payment Details
      </Typography>
    </Box>
  );
};

export default OnboardingForm;
