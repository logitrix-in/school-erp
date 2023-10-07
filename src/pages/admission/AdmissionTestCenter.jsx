import React from "react";
import TestcenterDashboard from "../../components/admission/test-center/TestcenterDasahboard";
import OnlinetestInterview from "../../components/admission/test-center/OnlinetestInterview";
import Evaluation from "../../components/admission/test-center/Evaluation";
import MeritListInterview from "../../components/admission/test-center/MeritListInterview";
import ManageTestInterview from "../../components/admission/test-center/ManageTestINterview";
import { Grid } from "@mui/material";

const AdmissionTestCenter = () => {
  return (
    <>
      <TestcenterDashboard />
      <Grid container spacing={2} mt={1}>
        <Grid item xs={6}>
          <ManageTestInterview />
        </Grid>
        <Grid item xs={6}>
          <MeritListInterview />
        </Grid>
        <Grid item xs={6}>
          <OnlinetestInterview />
        </Grid>
        <Grid item xs={6}>
          <Evaluation />
        </Grid>
      </Grid>
    </>
  );
};

export default AdmissionTestCenter;
