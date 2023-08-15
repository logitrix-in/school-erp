import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { Icon } from "@iconify/react";
import {config} from '../config'

const Navbar = () => {
  return (
    <Box
      p={2}
      px={3}
      display={"flex"}
      justifyContent={"space-between"}
      height={"4.5rem"}
      ml={config.NAVBAR_WIDTH}
      flex={1}
      alignItems={"center"}
      sx={{
        backgroundColor: "rgba(255,255,255,0.3)",
        backdropFilter: "blur(5px)",
        pointerEvents: 'auto'
      }}
    >
      <Box mr={"auto"}>
        <TextField
          size="small"
          placeholder="Search Faculty/Parent/Student"
          sx={{ width: "22rem" }}
          variant="outlined"
          InputProps={{
            sx: {
              fontSize: '0.9rem'
            },
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ fontSize: "1.3rem" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box display={"flex"} gap={1} fontSize={"1.6rem"} mr={2} color={"black"}>
        <IconButton>
          <Icon icon="mingcute:notification-fill" />
        </IconButton>
        <IconButton>
          <Icon icon="gg:list" />
        </IconButton>
        <IconButton>
          <Icon icon="simple-line-icons:calender" />
        </IconButton>
      </Box>
      <Button variant="contained" LinkComponent={Link} to="/login" size="small">
        Login
      </Button>
    </Box>
  );
};

export default Navbar;
