import { createContext, useContext, useState, useEffect } from "react";
import { useProtectedBlobUrl } from "./protectedFile";
import "./FileViewerContext.css";

const FileViewerContext = createContext(null);

export function FileViewerProvider({ children }) {
  const [viewer, setViewer] = useState(null);

  const openFile = (slug, title) => setViewer({ slug, title });
  const closeFile = () => setViewer(null);

  return (
    <FileViewerContext.Provider value={openFile}>
      {children}
      {viewer && (
        <FileViewerModal slug={viewer.slug} title={viewer.title} onClose={closeFile} />
      )}
    </FileViewerContext.Provider>
  );
}

export function useFileViewer() {
  return useContext(FileViewerContext);
}

function FileViewerModal({ slug, title, onClose }) {
  const { blobUrl, loading, error } = useProtectedBlobUrl(slug);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fv-overlay" onClick={onClose}>
      <div className="fv-panel" onClick={(e) => e.stopPropagation()}>
        <div className="fv-header">
          <span className="fv-title">{title}</span>
          <button className="fv-close" onClick={onClose} aria-label="Close">
            <span className="material-icons">close</span>
          </button>
        </div>
        <div className="fv-body">
          {loading && (
            <div className="fv-state">
              <span className="material-icons fv-spin">progress_activity</span>
              <p>Loading…</p>
            </div>
          )}
          {error && (
            <div className="fv-state">
              <span className="material-icons">error_outline</span>
              <p>Could not load file. Please try again.</p>
            </div>
          )}
          {blobUrl && <iframe src={blobUrl} title={title} className="fv-iframe" />}
        </div>
      </div>
    </div>
  );
}
