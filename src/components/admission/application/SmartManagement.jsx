import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import AutoResponse from "./popups/AutoResponse";

const SmartManagement = () => {

  const [showAutoResponse, setShowAutoResponse] = useState(false);

  return (
    <>
      <RevealCard>
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
      </RevealCard>

      <RevealCard delay={0.4}>
        <Bbox
          borderRadius={2}
          p={2}
          display={"flex"}
          gap={2}
          mt={1}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Button fullWidth variant="contained" color="primary" onClick={() => setShowAutoResponse(true)}>
            Set Auto Response
          </Button>
          <AutoResponse open={showAutoResponse} close={() => setShowAutoResponse(false)} />
          <Button fullWidth variant="contained" color="primary">
            Multiple Application
          </Button>
          <Button fullWidth variant="contained" color="primary">
            Engage
          </Button>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default SmartManagement;
