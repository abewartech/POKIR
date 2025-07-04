import BackButton from "../components/BackButton";
import { useEffect } from "react";

export default function Spartan() {
  useEffect(() => {
    if (window.ipc) {
      window.ipc.send("show-spartan");
    }
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <div className="px-7 py-5">
        <BackButton goTo="/home" />
      </div>
      {/* The BrowserView will be shown by the main process */}
    </div>
  );
}
