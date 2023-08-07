import { Box, Button, Typography } from "@mui/material";
import React from "react";

const ScreeningManager = () => {
  return (
    <>
      <Box
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
          Screening Management
        </Typography>
      </Box>
      <Box
        display={"flex"}
        gap={2}
        mt={2}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Button fullWidth variant="contained" color="primary">
          Screen Pending Application
        </Button>
        <Button fullWidth variant="contained" color="primary">
          Reset Screening
        </Button>
        <Button fullWidth variant="contained" color="primary">
          Review
        </Button>
      </Box>
    </>
  );
};

export default ScreeningManager;
