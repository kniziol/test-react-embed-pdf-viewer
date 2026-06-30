import React, { useEffect, useRef } from "react";
import { PDFViewer } from "@embedpdf/react-pdf-viewer";
import { usePdfiumEngine } from "@embedpdf/engines/react";

const App = () => {
  const viewerRef = useRef(null);
  const { isLoading } = usePdfiumEngine();

  useEffect(() => {
    const setZoom = async () => {
      const registry = await viewerRef?.current?.registry;
      const docManager = registry?.getPlugin("document-manager").provides();
      const zoom = registry.getPlugin("zoom").provides();

      docManager.onDocumentOpened((doc) => {
        setTimeout(function () {
          // zoom.requestZoom(ZoomMode.Automatic); // does not work
          // zoom.requestZoom(ZoomMode.FitWidth); // does not work
          // zoom.requestZoom(ZoomMode.FitPage); // does not work
          zoom.requestZoom(1); // it works
        }, 100);
      });
    };

    if (isLoading) {
      return;
    }

    setZoom();
  }, [isLoading]);

  return (
    <div style={{
      height: "100vh",
    }}>
      <PDFViewer
        ref={viewerRef}
        config={{
          src: "https://snippet.embedpdf.com/ebook.pdf",
        }}
      />
    </div>
  );
};

export default App;
