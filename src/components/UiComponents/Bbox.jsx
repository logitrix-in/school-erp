import { Box } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';

const Bbox = (props) => {

  return (
    <Box {...props} bgcolor={'white'} sx={{ border: "1px solid", borderColor: "grey.200", boxShadow:'0 2px 10px -2px #5555552f' }}>
      {props.children}
    </Box>
  );
};

export default Bbox;
