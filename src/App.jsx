import { Box } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.scss";
import "./assets/scss/scrollbar.scss";
import Breadcrumb from "./components/Breadcrumb";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ApplicationView from "./components/admission/application/ApplicationView";
import ReviewScreening from "./components/admission/screening/ReviewScreening";
import ScreeningRuleEdit from "./components/admission/screening/ScreeningRuleEdit";
import { config } from "./config";
import { AppContext } from "./context/AppContext";
import useAuth from "./hooks/useAuth";
import _404 from "./pages/404Page";
import Dashboard from "./pages/Dashboard";
import AdmissionApplication from "./pages/admission/AdmissionApplication";
import AdmissionOnboarding from "./pages/admission/AdmissionOnboarding";
import AdmissionScreening from "./pages/admission/AdmissionScreening";
import AdmissionTestCenter from "./pages/admission/AdmissionTestCenter";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Logger } from "./config/Logger";
import IssueAdmitCard from "./components/admission/test-center/pages/IssueAdmitCard";
import BulkManage from "./components/admission/test-center/pages/BulkManage";

const NavLayout = () => {
  const ux = useAuth();
  const naviagte = useNavigate();

  useEffect(() => {
    if (ux.user == null) {
      naviagte("/login");
    }
  });
  return (
    <>
      <Box
        display={"flex"}
        width={"100vw"}
        position={"fixed"}
        top={0}
        zIndex={100}
        sx={{ pointerEvents: "none" }}
        overflow={"hidden"}
        height={"100vh"}
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
        paddingTop={"7rem"}
        ml={config.NAVBAR_WIDTH}
      >
        <Breadcrumb />
        <Outlet />
        <Footer />
      </Box>
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
      .get("https://web-production-a472.up.railway.app/api/login/current/", {
        headers: {
          "x-api-key": "a8518942-17ea-44a6-b4e1-a974189a9a90",
        },
        withCredentials: true,
      })
      .then((res) => {
        context.setUser(res.data);
        if (currentRoute == "/") navigate("/dashboard/");
      })
      .catch((er) => {
        context.setUser(null);
        navigate("/login/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<NavLayout />}>
            <Route path="dashboard/" element={<Dashboard />} />

            {/* application Routes */}
            <Route
              path="admission/application/"
              element={<AdmissionApplication />}
            />
            <Route
              path="admission/application/view"
              element={<ApplicationView />}
            />

            {/* screening */}
            <Route
              path="admission/screening/"
              element={<AdmissionScreening />}
            />
            <Route
              path="admission/screening/edit/"
              element={<ScreeningRuleEdit />}
            />

            <Route
              path="admission/screening/review/"
              element={<ReviewScreening />}
            />

            {/* Test Center */}

            <Route
              path="admission/test-center/"
              element={<AdmissionTestCenter />}
            />
            <Route
              path="admission/test-center/issue-admit-card/"
              element={<IssueAdmitCard />}
            />
            <Route
              path="admission/test-center/issue-admit-card/bulk-manage/"
              element={<BulkManage />}
            />

            {/*  */}

            <Route
              path="admission/onboarding/"
              element={<AdmissionOnboarding />}
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
