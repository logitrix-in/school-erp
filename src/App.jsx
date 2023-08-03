import { AppBar, Box, Button, ButtonGroup, Typography } from "@mui/material";
import "./App.scss";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import _404 from "./pages/404Page";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Admission from "./pages/admission/Admission";

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

  useEffect(() => {
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
            <Route index element={<Dashboard />} />
            <Route path="admission/" element={<Admission />} />
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
