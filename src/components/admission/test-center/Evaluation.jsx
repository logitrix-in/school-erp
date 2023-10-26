import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";

const Evaluation = () => {
  return (
    <>
      <RevealCard>
        <Bbox borderRadius={2} bgcolor={"white"}>
          <Box
            py={2}
            px={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
              Evaluation
            </Typography>
          </Box>

          <Divider />
          <Box
            borderRadius={2}
            p={2}
            display={"flex"}
            gap={2}
            justifyContent={'center'}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Button fullWidth variant="outlined" color="primary" >
              Upload Offline Test Score
            </Button>
            <Button fullWidth variant="outlined" color="primary" >
              Upload Interview Score
            </Button>
            <Button fullWidth variant="contained" color="primary" >
              Results
            </Button>
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default Evaluation;
