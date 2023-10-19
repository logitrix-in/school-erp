import React from "react";
import TestcenterDashboard from "../../components/admission/test-center/TestcenterDasahboard";
import OnlinetestInterview from "../../components/admission/test-center/OnlinetestInterview";
import Evaluation from "../../components/admission/test-center/Evaluation";
import MeritListInterview from "../../components/admission/test-center/MeritListInterview";
import ManageTestInterview from "../../components/admission/test-center/ManageTestInterview";
import { Grid } from "@mui/material";

const AdmissionTestCenter = () => {
  return (
    <>
      <TestcenterDashboard />
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <ManageTestInterview />
        </Grid>
        <Grid item xs={12}>
          <OnlinetestInterview />
        </Grid>
        <Grid item xs={12}>
          <Evaluation />
        </Grid>
        <Grid item xs={12}>
          <MeritListInterview />
        </Grid>
      </Grid>
    </>
  );
};

export default AdmissionTestCenter;
