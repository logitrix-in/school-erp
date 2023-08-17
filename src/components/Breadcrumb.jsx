import React, { useState } from "react";
import Bbox from "./UiComponents/Bbox";
import { Breadcrumbs, IconButton, Tooltip, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  var paths = location.pathname.toUpperCase().split("/");
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Bbox
      px={2}
      py={1}
      mb={2}
      borderRadius={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        {paths.slice(1, paths.length - 1).map((path, _) => (
          <Typography variant="caption" key={_}>
            {path}
          </Typography>
        ))}
      </Breadcrumbs>
      <Tooltip title={bookmarked ? "Remove Bookmark" : "Bookmark"}>
        <IconButton size="small" onClick={() => setBookmarked((prev) => !prev)}>
          <Icon icon="solar:bookmark-bold" color={bookmarked ? "black" : ""} />
        </IconButton>
      </Tooltip>
    </Bbox>
  );
};

export default Breadcrumb;
