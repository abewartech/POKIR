"use client";

import Menu from "../components/MainMenu/Menu";
import umkmIcon from "../public/umkm.svg";
import visitorIcon from "../public/visitor.svg";
import spartanIcon from "../public/spartan.svg";
import arrowIcon from "../public/maki_arrow.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useVisitorData from "../hooks/useVisitorData";
import { useEffect, useRef, useState } from "react";
import { Slide } from "react-slideshow-image";

export default function Home() {
  const router = useRouter();
  const { visitorCount, loading, error } = useVisitorData();
  const [inactive, setInactive] = useState(false);
  const timerRef = useRef(null);

  const handleInactivity = () => {
    setInactive(true);
  };

  const resetTimer = () => {
    setInactive(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleInactivity, 5000); // 60 detik tanpa interaksi
  };

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line
  }, []);

  const redirectTo = (page) => {
    router.push(page);
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#000",
    height: "100vh",
  };

  const slideImages = [
    {
      url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "Slide 1",
    },
    {
      url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
      caption: "Slide 2",
    },
    {
      url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "Slide 3",
    },
  ];

  if (inactive) {
    return (
      <div className="slide-container">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage.url})`,
                }}
              ></div>
            </div>
          ))}
        </Slide>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-7 flex justify-center flex-col max-w-[60rem] mx-auto">
      <div className="text-[2.25rem] font-bold mb-8 text-[#3C3C3C]">
        Main Menu
      </div>
      <div className="flex gap-6">
        <div className="w-2/4">
          <Menu
            bgColor="bg-[#B0C9FF]"
            icon={umkmIcon}
            title="UMKM"
            subtitle="UMKM Terdaftar"
            textColor="text-[#2563EB]"
            value={50}
            onClick={() => redirectTo("/umkm-list")}
          />
        </div>
        <div className="w-2/4">
          <Menu
            bgColor="bg-[#AAFFBC]"
            icon={visitorIcon}
            title="Visitor"
            subtitle="Visitor Terdaftar"
            textColor="text-[#42B55A]"
            value={loading ? "Loading..." : visitorCount}
            onClick={() => redirectTo("/visitor")}
          />
        </div>
      </div>
      <div className="w-4/4">
        <Menu
          bgColor="bg-[#FBA197]"
          icon={spartanIcon}
          title="SPARTAN"
          subtitle="Sistem Perizinan Administrasi Ternak & Ikan"
          textColor="text-[#CD4637]"
          value={<Image src={arrowIcon} alt="arrow" />}
          onClick={() => redirectTo("/spartan")}
        />
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}
    </div>
  );
}
