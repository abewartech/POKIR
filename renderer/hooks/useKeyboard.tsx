import { useEffect } from "react";

// Extend the Window interface to include electronAPI
declare global {
  interface Window {
    electronAPI?: {
      isWindows?: () => boolean;
      showKeyboard?: () => void;
    };
  }
}

export function useKeyboard() {
  useEffect(() => {
    const handleFocus = (e) => {
      if (e.target.matches('input, textarea, [contenteditable="true"]')) {
        // Try standard VirtualKeyboard API first
        if ("virtualKeyboard" in navigator) {
          (navigator.virtualKeyboard as { show: () => void }).show();
          return;
        }

        // Fallback to Electron IPC for Windows
        if (window.electronAPI?.isWindows?.()) {
          window.electronAPI.showKeyboard();
        }
      }
    };

    document.addEventListener("focusin", handleFocus);
    return () => document.removeEventListener("focusin", handleFocus);
  }, []);
}
