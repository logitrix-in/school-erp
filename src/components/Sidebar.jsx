import { Icon, InlineIcon } from "@iconify/react";
import { Search } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { navigations } from "../navigation/navigations";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();

  const isPathActive = (path) => {
    return location.pathname.startsWith(`/${path}`);
  };

  const [activeTab, setActiveTab] = useState(null);

  function handleDropdown(idx) {
    if (idx != activeTab) {
      setActiveTab(idx);
    } else if (activeTab != null) {
      setActiveTab(null);
    }
  }

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
          placeholder="Search Modules"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ fontSize: "1.3rem" }} />
              </InputAdornment>
            ),
          }}
        />

        {navigations.map((nav, idx) => (
          <Box mt={1} key={idx}>
            <Box
              component={Link}
              to={nav.dropdown ? null : nav?.path}
              onClick={() => nav.dropdown && handleDropdown(idx)}
              className={`${isPathActive(nav.path) ? "active" : ""}`}
              py={1.2}
              minHeight={"3rem"}
              px={2}
              display={"flex"}
              alignItems={"center"}
              borderRadius={1}
              sx={{
                cursor: "pointer",
                "&.active": {
                  bgcolor: "secondary.light",
                },
                "&.active .navs": {
                  fontWeight: "500",
                  color: "secondary.main",
                },
                "&:hover": { bgcolor: "secondary.light" },
                "&:hover .navs": {
                  color: "secondary.main",
                },
              }}
            >
              <Box
                display={"flex"}
                width={"100%"}
                gap={1}
                alignItems={"center"}
                className="navs"
                color={"#4d4d4d"}
              >
                <Icon icon={nav.icon} />
                <Typography
                  textTransform={"capitalize"}
                  lineHeight={"1ch"}
                  mr={"auto"}
                >
                  {nav.name}
                </Typography>
                {nav.dropdown && (
                  <IconButton
                    onClick={() => handleDropdown(idx)}
                    sx={{
                      rotate: activeTab == idx && "-180deg",
                      transition: "0.3s",
                    }}
                  >
                    <Icon icon="mingcute:down-fill" height={15} />
                  </IconButton>
                )}
              </Box>
            </Box>
            {/* submenu */}
            <Box>
              <Box borderLeft={"1px solid #d6d6d6"} marginLeft={"1rem"}>
                {activeTab == idx &&
                  nav.subMenu?.map((submenu, idx) => (
                    <Link key={idx} to={submenu.path}>
                      <Box
                        p={1}
                        py={1.3}
                        display={"flex"}
                        borderRadius={1}
                        ml={1}
                        alignItems={"center"}
                        gap={1}
                        color={"#4d4d4d"}s
                        className={`${
                          isPathActive(submenu.path) ? "active" : ""
                        }`}
                        sx={{
                          cursor: "pointer",
                          "&.active": {
                            color: "secondary.main",
                          },
                          "&.active .navs": {
                            fontWeight: "500",
                            color: "secondary.main",
                          },
                          "&:hover": { color: "secondary.main" },
                          "&:hover .navs": {
                            color: "secondary.main",
                          },
                        }}
                      >
                        <Icon icon={submenu.icon} height={13} />
                        <Typography className="navs">{submenu.name}</Typography>
                      </Box>
                    </Link>
                  ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Sidebar;
