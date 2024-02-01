import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../config/api";

const OnboardingForm = () => {
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
        console.log(res.data);
        setCandidate(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  return (
    <Box>
      <Typography fontSize={"1.3rem"}>Onboarding Form</Typography>
    </Box>
  );
};

export default OnboardingForm;
