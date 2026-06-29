import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "./Login";
import SetUpAccount from "./SetUpAccount";
import "./App.css";
import Approved from "./Approved";
import Denied from "./Denied";
import Home from "./Home";
import "./Home.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Videos from "./Videos";
import WillsTrust from "./WillsTrust";
import Rollovers from "./Rollovers";
import Brochures from "./Brochures";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import AdminPanel from "./AdminPanel";
import RmdPanel from "./RmdPanel";
import More from "./More";
import Information from "./Information";
import Applications from "./Applications";
import ExamOne from "./ExamOne";
import Setups from "./Setups";
import RegisterAccounts from "./RegisterAccounts";
import AddressBook from "./AddressBook";
import License from "./License";
import SuccessStories from "./SuccessStories";
import HelpfulLinks from "./HelpfulLinks";
import Layout from "./Layout";

function RmdRoute() {
  const isRmd = localStorage.getItem("is_rmd_member") === "true";
  return isRmd ? <Outlet /> : <Navigate to="/home" replace />;
}

function NewMemberRoute() {
  const role = localStorage.getItem("role");
  const location = useLocation();
  if (role !== "New Member") return <Outlet />;
  const grantedPages = JSON.parse(localStorage.getItem("granted_pages") || "[]");
  if (grantedPages.includes(location.pathname)) return <Outlet />;
  return <Navigate to="/home" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes — no shared navbar */}
        <Route path="/"                      element={<Navigate to="/login" replace />} />
        <Route path="/login"                 element={<Login />} />
        <Route path="/setup-account/:token"  element={<SetUpAccount />} />
        <Route path="/approved"              element={<Approved />} />
        <Route path="/denied"                element={<Denied />} />
        <Route path="/forgot-password"       element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* App routes — share one persistent Navbar via Layout */}
        <Route element={<Layout />}>
          {/* Open to all roles, including New Member */}
          <Route path="/home"              element={<Home />} />
          <Route path="/wills-trust"       element={<WillsTrust />} />
          <Route path="/brochures"         element={<Brochures />} />
          <Route path="/more/address-book" element={<AddressBook />} />
          <Route path="/success-stories"   element={<SuccessStories />} />
          <Route path="/helpful-links"     element={<HelpfulLinks />} />
          <Route path="/step6"             element={<Step6 />} />

          {/* Restricted from New Members */}
          <Route element={<NewMemberRoute />}>
            <Route path="/step1" element={<Step1 />} />
            <Route path="/step2" element={<Step2 />} />
            <Route path="/step3" element={<Step3 />} />
            <Route path="/step4" element={<Step4 />} />
            <Route path="/step5" element={<Step5 />} />
            <Route path="/videos/illustrations" element={<Videos />} />
            <Route path="/videos/application"   element={<Videos />} />
            <Route path="/videos/stories"       element={<Videos />} />
            <Route path="/rollovers" element={<Rollovers />} />
            <Route path="/license"   element={<License />} />
            <Route path="/admin"     element={<AdminPanel />} />
            <Route element={<RmdRoute />}>
              <Route path="/rmd" element={<RmdPanel />} />
            </Route>
            <Route path="/more/information"       element={<Information />} />
            <Route path="/more/applications"      element={<Applications />} />
            <Route path="/more/examone"           element={<ExamOne />} />
            <Route path="/more/setups"            element={<Setups />} />
            <Route path="/more/register-accounts" element={<RegisterAccounts />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
