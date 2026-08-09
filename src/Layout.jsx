import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { FileViewerProvider } from "./FileViewerContext";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <FileViewerProvider>
      <Navbar />
      <Outlet />
    </FileViewerProvider>
  );
}
