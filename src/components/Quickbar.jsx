import React from "react";
import Bbox from "./UiComponents/Bbox";
import { Box, Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

const Quickbar = () => {
  return (
    <Box width={"100%"} display={"flex"} justifyContent={"center"} >
      <Box
        flex={1}
        p={1}
        bgcolor={"rgba(151, 151, 151, 0.06)"}
        borderRadius={1}
        boxShadow={"0 2px 10px -2px rgba(0,0,0,0.2)"}
        display="flex"
        gap={2}
        alignItems="center"
      >
        <Box display={"flex"} alignItems={"center"}>
          <Icon
            icon={"solar:history-bold-duotone"}
            color="gray"
            fontSize={"1.5rem"}
          />
        </Box>

        <Box
          p={0.5}
          // bgcolor={"#3B98C420"}
          borderRadius={1}
          px={2}
          display={"flex"}
          gap={1}
          alignItems={"center"}
          boxShadow={"1px 1px 5px 0 rgba(0,0,0,0.2)"}
          sx={{
            // background: "linear-gradient(to bottom, #3b99c418, #3b99c451)"
          }}
          bgcolor={"#3B98C420"}
          whiteSpace="nowrap"
          textAlign={"center"}
        >
          <Box
            height={12}
            sx={{ aspectRatio: 1 }}
            bgcolor={"#3B98C4"}
            borderRadius={100}
          />
          <Typography flex={1} textAlign={"center"}>
            Inventory Management
          </Typography>
        </Box>
        <Box
          p={0.5}
          bgcolor={"#3B98C420"}
          borderRadius={1}
          px={2}
          display={"flex"}
          gap={1}
          alignItems={"center"}
          boxShadow={"0 1px 10px -4px rgba(0,0,0,0.4)"}
          width={1}
          whiteSpace="nowrap"
          textAlign={"center"}
        >
          <Box
            height={12}
            sx={{ aspectRatio: 1 }}
            bgcolor={"#3B98C4"}
            borderRadius={100}
          />
          <Typography flex={1} textAlign={"center"}>
            Library
          </Typography>
        </Box>
        <Box
          p={0.5}
          bgcolor={"#3B98C420"}
          borderRadius={1}
          px={2}
          display={"flex"}
          gap={1}
          alignItems={"center"}
          boxShadow={"0 1px 10px -4px rgba(0,0,0,0.4)"}
          width={1}
          whiteSpace="nowrap"
          textAlign={"center"}
        >
          <Box
            height={12}
            sx={{ aspectRatio: 1 }}
            bgcolor={"#3B98C4"}
            borderRadius={100}
          />
          <Typography flex={1} textAlign={"center"}>
            Catalouge
          </Typography>
        </Box>
        <Box
          p={0.5}
          bgcolor={"#3B98C420"}
          borderRadius={1}
          px={2}
          display={"flex"}
          gap={1}
          alignItems={"center"}
          boxShadow={"0 1px 10px -4px rgba(0,0,0,0.4)"}
          width={1}
          whiteSpace="nowrap"
          textAlign={"center"}
        >
          <Typography flex={1} textAlign={"center"}>
            Library
          </Typography>
        </Box>
        <Box
          p={0.5}
          bgcolor={"#3B98C420"}
          borderRadius={1}
          px={2}
          display={"flex"}
          gap={1}
          alignItems={"center"}
          boxShadow={"0 1px 10px -4px rgba(0,0,0,0.4)"}
          width={1}
          whiteSpace="nowrap"
          textAlign={"center"}
        >
          <Typography flex={1} textAlign={"center"}>
            Inventory Management
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Quickbar;
