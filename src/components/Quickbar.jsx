import React from "react";
import Bbox from "./UiComponents/Bbox";
import { Button } from "@mui/material";

const Quickbar = () => {
  return (
    <Bbox
      p={1.4}
      mb={0.5}
      borderRadius={2}
      display="flex"
      gap={1}
      alignItems="center"
    >
      <Button color="primary" size="small" variant="contained">
        Application
      </Button>
      <Button color="primary" size="small" variant="contained">
        Library
      </Button>
    </Bbox>
  );
};

export default Quickbar;
