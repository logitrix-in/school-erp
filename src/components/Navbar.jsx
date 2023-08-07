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

const Navbar = () => {
  return (
    <Box
      p={2}
      px={3}
      pl={0}
      display={"flex"}
      justifyContent={"space-between"}
      height={"4.5rem"}
      alignItems={"center"}
    >
      <Box width={"18rem"} pl={3}>
        <Typography
          fontSize={"1.2rem"}
          color={"secondary.dark"}
          fontWeight={"500"}
        >
          SociolinQ
        </Typography>
      </Box>

      <Box mr={"auto"}>
        <TextField
          size="small"
          placeholder="Search Faculty/Parent/Student"
          sx={{ width: "20rem" }}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ fontSize: "1.3rem" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box display={"flex"} gap={1} fontSize={"1.6rem"} mr={2} color={'black'}>
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
      <Button
        variant="contained"
        size="medium"
        LinkComponent={Link}
        to="/login"
      >
        Login
      </Button>
    </Box>
  );
};

export default Navbar;
