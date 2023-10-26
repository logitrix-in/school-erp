import { Box, Typography } from "@mui/material";
import React from "react";
import Bbox from "../../../UiComponents/Bbox";

const IssueAdmitCard = () => {
  return <Bbox borderRadius={1} p={1}>
    <Typography p={1} px={2} borderRadius={1} bgcolor={'#f2f2f2'} fontWeight={600}>Issue Admit Card</Typography>
  </Bbox>;
};

export default IssueAdmitCard;
