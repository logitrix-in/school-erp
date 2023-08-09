import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
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

const NavLayout = () => {
  const location = useLocation();
  var paths = location.pathname.toUpperCase().split("/");

  const [bookmarked, setBookmarked] = useState(false);

  return (
    <>
      <Navbar />
      <Box display="flex" pr={3}>
        <Sidebar />
        <Box
          flex={1}
          bgcolor={"#f6f6f6"}
          padding={2}
          sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          minHeight={"100vh"}
        >
          <Bbox
            px={1}
            py={1}
            mb={1}  
            borderRadius={2}
            display="flex"
            gap={1}
            alignItems="center"
          >
            <Button color="secondary" size="small" variant="contained">Application</Button>
            <Button color="secondary" size="small" variant="contained">Library</Button>
          </Bbox>
          <Bbox
            px={2}
            py={1}
            mb={1}
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
            <Tooltip title={bookmarked ? "Remove Bookmark" : "Bookmark"} >
              <IconButton
                title="bookmark"
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
        </Box>
      </Box>
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
