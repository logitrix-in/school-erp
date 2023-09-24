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
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  var paths = location.pathname.split("/");
  console.log(paths);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Box
      mb={1}
      mt={1}
      py={0.6}
      borderRadius={1}

    >
  
      <Box
        borderRadius={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Breadcrumbs
          separator={<Icon icon={"bi:diamond-fill"} fontSize={7} />}
          color={"#2C7BA0"}
        >
          {paths.slice(1, paths.length - 1).map((path, idx) =>
            idx == 0 ? (
              <Typography
                textTransform={"capitalize"}
                fontSize={"0.95rem"}
                key={idx}
              >
                {path}
              </Typography>
            ) : (
              <Typography
                textTransform={"capitalize"}
                fontSize={"0.95rem"}
                key={idx}
                component={Link}
                to={paths.slice(1, idx + 2).join("/") + "/"}
              >
                {path}
              </Typography>
            )
          )}
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
