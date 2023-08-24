import React, { useState } from "react";
import Bbox from "./UiComponents/Bbox";
import {
  Box,
  Breadcrumbs,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  var paths = location.pathname.split("/");
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Box
      mb={1}
      mt={1}
      // p={2}
      py={0.6}
      borderRadius={1}
      sx={{
        // background: "linear-gradient( to left, #2C7BA0, #9BD9F4)",
      }}
      // bgcolor={'#9BD9F4'}
    >
      {/* <Typography
        textTransform={"capitalize"}
        fontWeight={600}
        fontSize={"1.5rem"}
        lineHeight={"1.5ch"}
        color={"#2C7BA0"}
      >
        {paths[2]}
      </Typography> */}
      <Box
        borderRadius={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Breadcrumbs separator={"."} color={"#2C7BA0"}>
          {paths.slice(1, paths.length - 1).map((path, _) => (
            <Typography
              textTransform={"capitalize"}
              fontSize={"1rem"}
              key={_}
            >
              {path}
            </Typography>
          ))}
        </Breadcrumbs>
        <Tooltip title={bookmarked ? "Remove Bookmark" : "Bookmark"}>
          <IconButton
            size="small"
            onClick={() => setBookmarked((prev) => !prev)}
          >
            <Icon
              icon="solar:bookmark-bold"
              color={bookmarked ? "#114d69" : "#3B98C4"}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Breadcrumb;
