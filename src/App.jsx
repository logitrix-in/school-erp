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
import IssueAdmitCard from "./components/admission/test-center/pages/ManageList/IssueAdmitCard";
import BulkManage from "./components/admission/test-center/pages/ManageList/BulkManage";
import UploadOfflineScore from "./components/admission/test-center/pages/Evalution/UploadOfflineScore";
import UploadInterviewScore from "./components/admission/test-center/pages/Evalution/UploadInterviewScore";
import SetMeritListRule from "./components/admission/test-center/pages/MeritList/SetMeritListRule";
import GenerateMeritList from "./components/admission/test-center/pages/MeritList/GenerateMeritList";
import ManageOnboarding from "./components/admission/onboarding/pages/ManageOnboarding";
import OnboardingMeritList from "./components/admission/onboarding/pages/OnboardingMeritList";
import OnboardingWaitingList from "./components/admission/onboarding/pages/OnboardingWaitingList";
import OnboardingForm from "./pages/OnboardingForm";
import AdmissionPostOnboarding from "./pages/admission/AdmissionPostOnboarding";
import ManageTickets from "./components/admission/post onboarding/ManageTickets";
import DetailedView from "./components/admission/application/DetailedView";
import OnboardingApproval from "./components/admission/onboarding/pages/OnboardingApproval";
import Test from "./pages/Test";
import dayjs from "dayjs";
import Information from "./pages/student/Information";

dayjs.locale("en-in");

const NavLayout = () => {
  const [loading, setLoading] = useState(true);
  const ux = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;

  useEffect(() => {
    axios
      .get("https://server.sociolinq.com/api/login/current/", {
        headers: {
          "x-api-key": "a8518942-17ea-44a6-b4e1-a974189a9a90",
        },
        withCredentials: true,
      })
      .then((res) => {
        ux.setUser(res.data);
        if (currentRoute == "/") navigate("/dashboard/");
      })
      .catch((er) => {
        ux.setUser(null);
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

function App() {
  const context = useContext(AppContext);

  return (
    <>
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

          <Route
            path="admission/application/view/:id/"
            element={<DetailedView />}
          />

          {/* screening */}
          <Route path="admission/screening/" element={<AdmissionScreening />} />
          <Route
            path="admission/screening/edit/"
            element={<ScreeningRuleEdit />}
          />

          <Route
            path="admission/screening/review/"
            element={<ReviewScreening />}
          />

          {/* Test Center */}

          {/* -- Manage Test / Interview */}
          <Route
            path="admission/test-center/"
            element={<AdmissionTestCenter />}
          />
          <Route
            path="admission/test-center/admit-card/"
            element={<IssueAdmitCard />}
          />
          <Route
            path="admission/test-center/admit-card/bulk-manage/"
            element={<BulkManage />}
          />

          {/* -- Evalution */}

          <Route
            path="admission/test-center/upload-offline-test-score/"
            element={<UploadOfflineScore />}
          />
          <Route
            path="admission/test-center/upload-interview-score/"
            element={<UploadInterviewScore />}
          />

          {/* -- Merit List */}

          <Route
            path="admission/test-center/set-rule/"
            element={<SetMeritListRule />}
          />

          <Route
            path="admission/test-center/generate-merit-list/"
            element={<GenerateMeritList />}
          />

          {/* Onboarding */}

          <Route
            path="admission/onboarding/"
            element={<AdmissionOnboarding />}
          />

          {/* -- Manage */}

          <Route
            path="admission/onboarding/manage/"
            element={<ManageOnboarding />}
          />

          {/* -- Merit List */}
          <Route
            path="admission/onboarding/manage/merit-list/"
            element={<OnboardingMeritList />}
          />

          {/* -- Waiting List */}
          <Route
            path="admission/onboarding/manage/waiting-list/"
            element={<OnboardingWaitingList />}
          />

          {/* -- Approval */}

          <Route
            path="admission/onboarding/:id"
            element={<OnboardingApproval />}
          />

          {/* Post Onboarding */}

          <Route
            path={"admission/post-onboarding/"}
            element={<AdmissionPostOnboarding />}
          />

          {/* -- Ticket */}

          <Route
            path={"admission/post-onboarding/manage-ticket/"}
            element={<ManageTickets />}
          />

          {/* student-information */}
          <Route
            path={'student/information/'}
            element={<Information />}
          />

          <Route path="*" element={<_404 />} />
        </Route>

        <Route path="admission/onboarding-form/" element={<OnboardingForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
