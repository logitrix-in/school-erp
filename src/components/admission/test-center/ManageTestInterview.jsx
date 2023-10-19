import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";

const ManageTestInterview = () => {
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
              Manage Test Interview
            </Typography>
          </Box>

          <Divider />
          <Box
            borderRadius={2}
            p={2}
            display={"flex"}
            gap={'5rem'}
            justifyContent={'center'}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Button variant="outlined" color="primary" sx={{width:'18rem'}}>
              Notification
            </Button>
            <Button variant="contained" color="primary" sx={{width:'18rem'}}>
              Issue Admit Card
            </Button>
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default ManageTestInterview;
