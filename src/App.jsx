import { AppBar, Box, Button, ButtonGroup, Typography } from "@mui/material";
import "./App.scss";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import _404 from "./pages/404Page";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Admission from "./pages/admission/AdmissionApplication";
import AdmissionApplication from "./pages/admission/AdmissionApplication";
import AdmissionScreening from "./pages/admission/AdmissionScreening";

const NavLayout = () => {
  return (
    <>
      <Navbar />
      <Box display="flex" pr={3}>
        <Sidebar />
        <Box
          flex={1}
          bgcolor={"#EEF2F6"}
          padding={2}
          sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          minHeight={"100vh"}
        >
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
