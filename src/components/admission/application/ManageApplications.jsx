import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import ManageTable from "./components/ManageTable";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";

const ManageApplications = () => {
  return (
    <>
      <RevealCard>
        <Bbox mt={3} borderRadius={2} bgcolor={"white"}>
          <Box
            py={2}
            px={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={1}
          >
            <Typography
              fontWeight={"700"}
              borderRadius={1}
              fontSize={"1.1rem"}
              mr={"auto"}
            >
              Manage Application
            </Typography>
          </Box>
          <Divider />

          <Box
            p={3}
            display={"flex"}
            alignItems={"center"}
            flexDirection={{ xs: "column", lg: "row" }}
            gap={2}
          >
            <Box
              flex={1}
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              alignItems={{ xs: "stretch", lg: "center" }}
              gap={2}
            >
              <Button sx={{ px: 5 }} variant="contained" color="primary">
                Open All
              </Button>
              <Button sx={{ px: 5 }} variant="contained" color="primary">
                Close All
              </Button>
            </Box>
            <Bbox borderRadius={1} flex={2} width={'100%'}>
              <ManageTable />
            </Bbox>

            <Box
              flex={1}
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              alignItems={{ xs: "stretch", lg: "center" }}
              gap={2}
            >
              <Button sx={{ px: 5 }} variant="contained" color="secondary">
                Edit
              </Button>
            </Box>
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default ManageApplications;
