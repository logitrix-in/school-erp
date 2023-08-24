import React from "react";
import Bbox from "./UiComponents/Bbox";
import { Box, Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

const Quickbar = () => {
  return (
    <Box width={"100%"} display={"flex"} justifyContent={"center"} px={"4rem"}>
      <Box
        flex={1}
        p={1}
        bgcolor={"rgba(151, 151, 151, 0.06)"}
        borderRadius={3}
        boxShadow={"0 2px 10px -3px rgba(0,0,0,0.4)"}
        display="flex"
        gap={2}
        alignItems="center"
      >
        <Box display={'flex'} alignItems={'center'}>
          <Icon icon={"solar:history-bold-duotone"} color="gray" fontSize={'1.5rem'}/>
        </Box>

        <Box
          p={0.5}
          bgcolor={"#00a76f20"}
          borderRadius={1}
          px={2}
          display={"flex"}
          gap={1}
          alignItems={"center"}
          boxShadow={"0 1px 10px -4px rgba(0,0,0,0.4)"}
          whiteSpace="nowrap"
          textAlign={"center"}
        >
          <Box
            height={12}
            sx={{ aspectRatio: 1 }}
            bgcolor={"#00A76F"}
            borderRadius={100}
          />
          <Typography flex={1} textAlign={"center"}>
            Inventory Management
          </Typography>
        </Box>
        <Box
          p={0.5}
          bgcolor={"#00a76f20"}
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
            bgcolor={"#00A76F"}
            borderRadius={100}
          />
          <Typography flex={1} textAlign={"center"}>
            Library
          </Typography>
        </Box>
        <Box
          p={0.5}
          bgcolor={"#00a76f20"}
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
            bgcolor={"#00A76F"}
            borderRadius={100}
          />
          <Typography flex={1} textAlign={"center"}>
            Catalouge
          </Typography>
        </Box>
        <Box
          p={0.5}
          bgcolor={"#00a76f20"}
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
          bgcolor={"#00a76f20"}
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
