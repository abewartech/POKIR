import React, { useEffect } from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import { getLayoutSelected, setLayoutSelected } from "../utils";
import useVisitorStore from "../stores/visitorStore";

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

  return <Component {...pageProps} />;
}

export default MyApp;
