import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Bbox from "../../UiComponents/Bbox";

const SmartManagement = () => {
  return (
    <>
      <Bbox
        mt={3}
        bgcolor={"white"}
        py={2}
        px={2}
        borderRadius={2}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"500"} borderRadius={1}>
          Smart Management
        </Typography>
      </Bbox>

      <Bbox
        borderRadius={2}
        p={2}
        display={"flex"}
        gap={2}
        mt={1}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Button fullWidth variant="contained" color="primary">
          Set Auto Response
        </Button>
        <Button fullWidth variant="contained" color="primary">
          Multiple Application
        </Button>
        <Button fullWidth variant="contained" color="primary">
          Engage
        </Button>
      </Bbox>
    </>
  );
};

export default SmartManagement;
