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
import Step4 from "./Step4";
import Brochures from "./Brochures";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import AdminPanel from "./AdminPanel";
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
          <Route path="/step4" element={<Step4 />} />
          <Route path="/brochures" element={<Brochures />} />
          <Route path="/admin"    element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
