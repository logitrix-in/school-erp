import { Icon } from "@iconify/react";
import { Search } from "@mui/icons-material";
import {
  Box,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { navigations } from "../navigation/navigations";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();
  const currentRoute = location.pathname;

  console.log(currentRoute.replace('/',''));
  return (
    <>
      <Box px={3} width={"18rem"}>
        <Box
          display={"flex"}
          p={2}
          borderRadius={2}
          bgcolor={"#EEF2F6"}
          gap={2}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <Icon icon="fluent-mdl2:git-logo" color="#2196F3" height={"2rem"} />
          <Box>
            <Typography fontSize={"1.1rem"} mb={0.3}>
              Rajesh Patel
            </Typography>
            <Typography
              fontSize={"0.9rem"}
              color={"secondary.main"}
              fontWeight={"500"}
            >
              Admin
            </Typography>
          </Box>
        </Box>
        <TextField
          sx={{ my: 2 }}
          label="Search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ fontSize: "1.3rem" }} />
              </InputAdornment>
            ),
          }}
        />

        {navigations.map((nav, idx) => (
          <Box mt={1}>
              <Link to={nav.path} key={idx}>
                <Box
              
                  className={currentRoute.replace('/','') == (nav.path) ? "active" : ""}
                  p={2}
                  borderRadius={1}
                  sx={{
                    cursor: "pointer",
                    "&.active": {
                      bgcolor: "secondary.light",
                    },
                    "&.active .navs": {
                      fontWeight: "500",
                      color:'secondary.main',  
                    },
                    "&:hover": { bgcolor: "secondary.light" },
                    "&:hover .navs": {
                      color: "secondary.main",
                    },
                  }}
                >
                  <Typography textTransform={"capitalize"} className="navs">
                    {nav.name}
                  </Typography>
                </Box>
              </Link>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Sidebar;
