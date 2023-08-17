import { Box } from "@mui/material";
import "./App.scss";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import _404 from "./pages/404Page";
import Loader from "./components/Loader";
import { useContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AdmissionApplication from "./pages/admission/AdmissionApplication";
import AdmissionScreening from "./pages/admission/AdmissionScreening";
import "./assets/scss/scrollbar.scss";
import { config } from "./config";
import Footer from "./components/Footer";
import Quickbar from "./components/Quickbar";
import Breadcrumb from "./components/Breadcrumb";
import axios from "axios";
import { AppContext } from "./context/AppContext";

const NavLayout = () => {
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
          <Quickbar />
          <Breadcrumb />
          <Outlet />
          <Footer />
        </Box>
      </>
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const currentRoute = location.pathname;
  const context = useContext(AppContext);

  useEffect(() => {
    axios
      .get("https://api.sociolinq.com/accounts/", {
        withCredentials: true,
      })
      .then((res) => {
        context.setUser(res.data);
        // naviagte('/dashboard')
        console.log(res);
      })
      .catch((er) => console.log(er));

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
