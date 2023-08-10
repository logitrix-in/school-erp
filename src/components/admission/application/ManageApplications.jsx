import { Box, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import ManageTable from "./components/ManageTable";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";

const ManageApplications = () => {
  return (
    <>
      <RevealCard>
        <Bbox
          mt={3}
          mb={1}
          bgcolor={"white"}
          py={2}
          px={2}
          borderRadius={2}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontWeight={"500"} borderRadius={1}>
            Manage Application
          </Typography>
        </Bbox>
      </RevealCard>

      <RevealCard delay={0.4}>
        <ManageTable />
      </RevealCard>
    </>
  );
};

export default ManageApplications;
