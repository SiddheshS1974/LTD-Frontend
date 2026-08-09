import { useState, useEffect } from "react";
import API from "./api";

export function useProtectedBlobUrl(slug) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    let currentUrl = null;
    let cancelled = false;
    const token = localStorage.getItem("token");
    setLoading(true);
    setBlobUrl(null);
    setError(false);

    fetch(`${API}/api/v1/files/${slug}/stream/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then(res => { if (!res.ok) throw new Error(); return res.blob(); })
      .then(blob => {
        if (cancelled) return;
        currentUrl = URL.createObjectURL(blob);
        setBlobUrl(currentUrl);
        setLoading(false);
      })
      .catch(() => { if (!cancelled) { setError(true); setLoading(false); } });

    return () => {
      cancelled = true;
      if (currentUrl) URL.revokeObjectURL(currentUrl);
    };
  }, [slug]);

  return { blobUrl, loading, error };
}

export async function openProtectedFile(slug, setOpening) {
  if (setOpening) setOpening(true);
  // Open the tab synchronously, inside the click gesture, so browsers don't
  // treat it as a popup — then point it at the file once it's fetched.
  const popup = window.open("", "_blank");
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/api/v1/files/${slug}/stream/`, {
      headers: { Authorization: `Token ${token}` },
    });
    if (!res.ok) throw new Error();
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    if (popup) {
      popup.location.href = url;
    } else {
      window.open(url, "_blank");
    }
  } catch {
    if (popup) popup.close();
    alert("Could not open file. Please try again.");
  } finally {
    if (setOpening) setOpening(false);
  }
}
