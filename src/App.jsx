import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import License from "./License";
import Layout from "./Layout";

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
          <Route path="/home"  element={<Home />} />
          <Route path="/step1" element={<Step1 />} />
          <Route path="/step2" element={<Step2 />} />
          <Route path="/step3" element={<Step3 />} />
          <Route path="/step4" element={<Step4 />} />
          <Route path="/step5" element={<Step5 />} />
          <Route path="/step6" element={<Step6 />} />
          <Route path="/videos/illustrations" element={<Videos />} />
          <Route path="/videos/application"   element={<Videos />} />
          <Route path="/videos/stories"       element={<Videos />} />
          <Route path="/wills-trust" element={<WillsTrust />} />
          <Route path="/rollovers"   element={<Rollovers />} />
          <Route path="/brochures"   element={<Brochures />} />
          <Route path="/license"  element={<License />} />
          <Route path="/admin"    element={<AdminPanel />} />
          <Route path="/rmd"      element={<RmdPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
