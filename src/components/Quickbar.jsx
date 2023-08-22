import React from "react";
import Bbox from "./UiComponents/Bbox";
import { Box, Button } from "@mui/material";
import { Icon } from "@iconify/react";

const Quickbar = () => {
  return (
    <Box
      p={1}
      bgcolor={"rgba(0,0,0,0.06)"}
      borderRadius={1}
      display="flex"
      gap={1}
      alignItems="center"
    >
      <Icon icon={"solar:history-bold-duotone"} fontSize={"1.5rem"} color="gray"/>
      <Button color="primary" size="small" variant="contained">
        Application
      </Button>
      <Button color="primary" size="small" variant="contained">
        Library
      </Button>
    </Box>
  );
};

export default Quickbar;
