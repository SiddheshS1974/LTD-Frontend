import { useState, useEffect } from "react";
import API from "./api";

export function useProtectedBlobUrl(slug) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    let currentUrl = null;
    let cancelled = false;
    const token = localStorage.getItem("token");
    setLoading(true);
    setBlobUrl(null);
    setError(false);
    setDenied(false);

    fetch(`${API}/api/v1/files/${slug}/stream/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then(res => {
        if (!res.ok) { const err = new Error(); err.status = res.status; throw err; }
        return res.blob();
      })
      .then(blob => {
        if (cancelled) return;
        currentUrl = URL.createObjectURL(blob);
        setBlobUrl(currentUrl);
        setLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        setLoading(false);
        if (err?.status === 403) setDenied(true);
        else setError(true);
      });

    return () => {
      cancelled = true;
      if (currentUrl) URL.revokeObjectURL(currentUrl);
    };
  }, [slug]);

  return { blobUrl, loading, error, denied };
}
