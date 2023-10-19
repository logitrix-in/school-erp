import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";

const MeritListInterview = () => {
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
              Merit List
            </Typography>
          </Box>

          <Divider />
          <Box
            borderRadius={2}
            p={2}
            display={"flex"}
            justifyContent={'center'}
            gap={'5rem'}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Button sx={{width: '18rem'}} variant="outlined">
              Set Rule
            </Button>
            <Button sx={{width: '18rem'}} variant="contained">
              Generate Merit List
            </Button>
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default MeritListInterview;
