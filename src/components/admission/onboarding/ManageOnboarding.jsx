import React from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Notify from "./popup/Notify";
import { signal } from "@preact/signals-react";

const notifyOpen = signal(false);
const ManageOnboarding = () => {
  return (
    <RevealCard>
      <Bbox borderRadius={2} overflow={"hidden"}>
        <Box
          bgcolor={"white"}
          py={1.3}
          px={3}
          borderRadius={2}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
            Manage Onboarding
          </Typography>
        </Box>

        <Divider />
        <Box p={3} display={"flex"} gap={2}>
          <Button
            fullWidth
            variant="contained"
            LinkComponent={Link}
            to={"manage/"}
          >
            Onboarding
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => (notifyOpen.value = true)}
          >
            Notify
          </Button>

          <Notify
            open={notifyOpen.value}
            close={() => (notifyOpen.value = false)}
          />
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default ManageOnboarding;
