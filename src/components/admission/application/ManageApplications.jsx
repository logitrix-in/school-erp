import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import ManageTable from "./components/ManageTable";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";

const ManageApplications = () => {
  return (
    <>
      <RevealCard>
        <Bbox mt={3} borderRadius={2} bgcolor={"white"}>
          <Box
            py={2}
            px={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontWeight={"500"}>Manage Application</Typography>
            <Button size="small" variant="contained" color="secondary">
              Edit
            </Button>
          </Box>
          <Divider />
          <Box>
            <ManageTable />
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default ManageApplications;
