import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SetUpAccount from "./SetUpAccount";
import "./App.css";
import Approved from "./Approved";
import Denied from "./Denied";
import Home from "./Home";
import "./Home.css";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/setup-account/:token" element={<SetUpAccount />} />
        <Route path="/approved" element={<Approved />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;