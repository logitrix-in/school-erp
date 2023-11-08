import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import Bbox from "../../components/UiComponents/Bbox";

const AdmissionPostOnboarding = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Bbox borderRadius={1}>
        <Typography
          py={1.3}
          px={3}
          fontWeight={"700"}
          borderRadius={1}
          fontSize={"1.1rem"}
        >
          Notificaton Center
        </Typography>
        <Divider />
        <Box p={3} display={"flex"} gap={1}>
          <Button fullWidth variant="contained">
            Engage
          </Button>
          <Button fullWidth variant="outlined">
            Notify
          </Button>
        </Box>
      </Bbox>

      <Bbox borderRadius={1}>
        <Typography
          py={1.3}
          px={3}
          fontWeight={"700"}
          borderRadius={1}
          fontSize={"1.1rem"}
        >
          App Installation Compliance
        </Typography>
        <Divider />
        <Box p={3} display={"flex"} gap={1}>
          <Button fullWidth variant="contained">
            Engage
          </Button>
          <Button fullWidth variant="outlined">
            Notify
          </Button>
        </Box>
      </Bbox>

      <Bbox borderRadius={1}>
        <Typography
          py={1.3}
          px={3}
          fontWeight={"700"}
          borderRadius={1}
          fontSize={"1.1rem"}
        >
          Ticket Log
        </Typography>
        <Divider />
        <Box p={3} display={"flex"} gap={1}>
          <Button fullWidth variant="contained">
            Engage
          </Button>
          <Button fullWidth variant="outlined">
            Notify
          </Button>
        </Box>
      </Bbox>
    </Box>
  );
};

export default AdmissionPostOnboarding;
