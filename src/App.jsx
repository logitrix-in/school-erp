import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import "./App.scss";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import _404 from "./pages/404Page";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AdmissionApplication from "./pages/admission/AdmissionApplication";
import AdmissionScreening from "./pages/admission/AdmissionScreening";
import "./assets/scss/scrollbar.scss";
import Bbox from "./components/UiComponents/Bbox";
import { Icon } from "@iconify/react";
import { config } from "./config";

const NavLayout = () => {
  const location = useLocation();
  var paths = location.pathname.toUpperCase().split("/");

  const [bookmarked, setBookmarked] = useState(false);

  return (
    <>
      <>
        <Box
          display={"flex"}
          width={"100vw"}
          position={"fixed"}
          top={0}
          zIndex={100}
          sx={{ pointerEvents: "none" }}
        >
          <Sidebar />
          <Navbar />
        </Box>

        <Box
          flex={1}
          bgcolor={"#ffffff"}
          pt={2}
          px={3}
          sx={{ borderRadius: 2 }}
          marginTop={"4rem"}
          ml={config.NAVBAR_WIDTH}
        >
          <Bbox
            p={1.4}
            mb={0.5}
            borderRadius={2}
            display="flex"
            gap={1}
            alignItems="center"
          >
            <Button color="primary" size="small" variant="contained">
              Application
            </Button>
            <Button color="primary" size="small" variant="contained">
              Library
            </Button>
          </Bbox>
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
              <IconButton
                size="small"
                onClick={() => setBookmarked((prev) => !prev)}
              >
                <Icon
                  icon="solar:bookmark-bold"
                  color={bookmarked ? "black" : ""}
                />
              </IconButton>
            </Tooltip>
          </Bbox>

          <Outlet />
          <Box mb={'auto'} />
          <Box
            py={2}
            pl={1}
            display={"flex"}
            gap={4}
            color={"#00a76f67"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              color={"gray"}
              variant="caption"
              fontWeight={600}
              mr={"auto"}
            >
              Last Logged In on 4th-june-2023 4:50 pm
            </Typography>
            <Box display={"flex"} alignItems={"center"} gap={0.4}>
              <Icon icon="fa:group" fontSize={"1.2rem"} />
              <Typography fontSize={10} lineHeight={"1ch"}>
                1000
              </Typography>
            </Box>
            <Icon icon="mingcute:signal-fill" fontSize={"1.4rem"} />
          </Box>
        </Box>
      </>
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentRoute = location.pathname;

  useEffect(() => {
    if (currentRoute == ("" || "/")) navigate("dashboard/");
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<NavLayout />}>
            <Route path="dashboard/" element={<Dashboard />} />

            {/* Admission Routes */}
            <Route
              path="admission/application/"
              element={<AdmissionApplication />}
            />
            <Route
              path="admission/screening/"
              element={<AdmissionScreening />}
            />

            <Route path="*" element={<_404 />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

export default App;
