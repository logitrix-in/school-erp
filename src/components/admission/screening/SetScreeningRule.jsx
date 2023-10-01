import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import { Link } from "react-router-dom";

const SetScreeningRule = () => {
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
        <Box display={'flex'} p={2} justifyContent={'space-between'}>
          <Typography
            fontWeight={"700"}
            borderRadius={1}
            fontSize={"1.1rem"}
          >
            Set Screening Rule
          </Typography>

          <Button variant="contained" color="secondary" size="small" LinkComponent={Link} to="edit/">Edit</Button>
        </Box>

        <Divider />
        <Box p={2} px={3} display={"flex"} flexDirection={"column"} gap={1}>
          <Box bgcolor={"#DAF3FE"} p={0.7} px={2} borderRadius={1}>
            Screening Rule Enabled
          </Box>
          <Box display={"flex"} gap={1} flexWrap={"wrap"}>
            <Bbox p={0.5} px={1.2} borderRadius={1}>
              class I
            </Bbox>
            <Bbox p={0.5} px={1.2} borderRadius={1}>
              class II
            </Bbox>
            <Bbox p={0.5} px={1.2} borderRadius={1}>
              class IV
            </Bbox>
          </Box>
          <Box bgcolor={"#DAF3FE"} p={0.7} px={2} borderRadius={1}>
            Screening Rule Disabled
          </Box>
          <Box display={"flex"} gap={1}>
            <Bbox p={0.5} px={1.2} borderRadius={1}>
              class X
            </Bbox>
            <Bbox p={0.5} px={1.2} borderRadius={1}>
              class XII-Science
            </Bbox>
            <Bbox p={0.5} px={1.2} borderRadius={1}>
              class XII-Arts
            </Bbox>
          </Box>
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default SetScreeningRule;
