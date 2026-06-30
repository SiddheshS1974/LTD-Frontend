import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import API from "./api";

export default function Layout() {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setReady(true); return; }
    fetch(`${API}/api/v1/me/`, { headers: { Authorization: `Token ${token}` } })
      .then((res) => { if (res.ok) return res.json(); })
      .then((data) => {
        if (data?.granted_pages !== undefined) {
          localStorage.setItem("granted_pages", JSON.stringify(data.granted_pages));
        }
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
