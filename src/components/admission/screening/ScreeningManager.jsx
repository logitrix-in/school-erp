import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";

const ScreeningManager = () => {
  return (
    <RevealCard>
      <Bbox
        mt={3}
        bgcolor={"white"}
        borderRadius={2}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"stretch"}
      >
        <Typography
          p={2}
          fontWeight={"700"}
          borderRadius={1}
          fontSize={"1.1rem"}
        >
          Screening Manager
        </Typography>
        <Divider />
        <Box
          p={2}
          px={3}
          display={"flex"}
          gap={2}
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
      </Bbox>
    </RevealCard>
  );
};

export default ScreeningManager;
