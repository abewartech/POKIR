import React, { useEffect } from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import { getLayoutSelected, setLayoutSelected } from "../utils";
import useVisitorStore from "../stores/visitorStore";

declare global {
  interface Window {
    scannerAPI?: {
      sendBarcode: (barcode: string) => Promise<{ success: boolean; status?: number; error?: string }>;
    };
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const { layout, setLayout } = useVisitorStore();

  useEffect(() => {
    let layoutSlctd = getLayoutSelected();
    if (layoutSlctd) {
      setLayout(layoutSlctd);
    } else {
      setLayoutSelected(1);
    }
    console.log(layout);
    
  }, [layout]);

  useEffect(() => {
    let buffer = "";
    let lastKeyTime = 0;

    const handleKeyDown = async (e: KeyboardEvent) => {
      const now = Date.now();

      // Reset buffer if typing is slow (human typing)
      if (now - lastKeyTime > 100) {
        buffer = "";
      }

      lastKeyTime = now;

      // ENTER = barcode complete
      if (e.key === "Enter") {
        if (!buffer) return;

        const barcode = buffer.trim();
        buffer = "";

        console.log("Scanned barcode:", barcode);

        if (window.scannerAPI) {
          const result = await window.scannerAPI.sendBarcode(barcode);
          console.log("HTTP result:", result);
        }
        return;
      }

      // Only accept printable characters
      if (e.key.length === 1) {
        buffer += e.key;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
