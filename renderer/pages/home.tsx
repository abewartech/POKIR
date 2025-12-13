import Menu from "../components/MainMenu/Menu";
import umkmIcon from "../public/umkm.svg";
import visitorIcon from "../public/visitor.svg";
import spartanIcon from "../public/spartan.svg";
import scheduleIcon from "../public/schedule.svg";
import arrowIcon from "../public/maki_arrow.svg";
import qrCodeIcon from "../public/qr-code.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useVisitorData from "../hooks/useVisitorData";
import { useEffect, useRef, useState } from "react";
import { Slide } from "react-slideshow-image";
import { slideImages } from "../data";

export default function Home() {
  const router = useRouter();
  const { visitorCount, loading, error, clearError } = useVisitorData();
  // const [inactive, setInactive] = useState(false);
  const [instructionShow, setInstructionShow] = useState(false);
  const [settings, setSettings] = useState(null);
  // const timerRef = useRef(null);

  useEffect(() => {
    const baseUrl = 'https://cmsimigrasi.monitoringmalaria.space';
    fetch(`${baseUrl}/api/settings`)
      .then(res => res.json())
      .then(data => {
        const fullLogo = `${baseUrl}/images/templates/${data.logo}`;
        const fullBg = `${baseUrl}/images/templates/${data.background_image}`;
        setSettings({ ...data, logo: fullLogo, background_image: fullBg });
      })
      .catch(console.error);
  }, []);

  // const handleInactivity = () => {
  //   setInactive(true);
  // };

  // const resetTimer = () => {
  //   setInactive(false);
  //   if (timerRef.current) clearTimeout(timerRef.current);
  //   timerRef.current = setTimeout(handleInactivity, 60000); // 60 detik tanpa interaksi
  // };

  // useEffect(() => {
  //   const events = ["mousemove", "mousedown", "keydown", "touchstart"];
  //   events.forEach((event) => window.addEventListener(event, resetTimer));
  //   resetTimer();

  //   return () => {
  //     events.forEach((event) => window.removeEventListener(event, resetTimer));
  //     if (timerRef.current) clearTimeout(timerRef.current);
  //   };
  //   // eslint-disable-next-line
  // }, []);

  const redirectTo = (page) => {
    router.push(page);
    clearError();
  };

  // const divStyle = {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundSize: "contain",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  //   backgroundColor: "#000",
  //   height: "100vh",
  // };

  // if (inactive) {
  //   return (
  //     <div className="slide-container">
  //       <Slide>
  //         {slideImages.map((slideImage, index) => (
  //           <div key={index}>
  //             <div
  //               style={{
  //                 ...divStyle,
  //                 backgroundImage: `url(${slideImage.url})`,
  //               }}
  //             ></div>
  //           </div>
  //         ))}
  //       </Slide>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>
        <div style={{ backgroundImage: `url(${settings?.background_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="relative z-1 min-h-screen p-7 flex justify-center flex-col max-w-[60rem] mx-auto ">
            {settings?.logo && (
              <div className="mb-4 flex justify-center">
                <Image src={settings.logo} alt="logo" width={100} height={100} />
              </div>
            )}
            <div className="text-[2.25rem] font-bold mb-8 text-[#ffffff]">
              Main Menu
            </div>
            <div className="flex gap-6">
              <div className="w-2/4 transition-transform duration-200 hover:scale-105">
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
              <div className="w-2/4 transition-transform duration-200 hover:scale-105">
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
            <div className="w-4/4 transition-transform duration-200 hover:scale-105">
              <Menu
                bgColor="bg-[#FBA197]"
                icon={spartanIcon}
                title={settings?.title || "SPARTAN"}
                subtitle={settings?.description || "Sistem Perizinan Administrasi Ternak & Ikan"}
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
            {/* <div
              className="flex justify-center mt-4 p-4 font-bold text-[18px] cursor-pointer text-[#FFFFFF]"
              onClick={() => setInstructionShow(true)}
            >
              <span className="me-3">
                <Image
                  src={scheduleIcon}
                  alt="schedule"
                  width={24}
                  height={24}
                />
              </span>
              Schedule Visitor
            </div> */}
          </div>
          {instructionShow && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-[#101010] flex flex-col justify-center rounded-lg shadow-lg max-w-[350px] h-[750px] relative p-8">
                <Image
                  src={qrCodeIcon}
                  alt="qr code"
                  className="animate-heartbeat"
                />
                <div className="text-[#ffffff] text-center mt-8 text-[20px]">
                  Arahkan QR Code Anda ke alat pemindai di bawah ini.
                </div>
                <button
                  onClick={() => setInstructionShow(false)}
                  className="w-[32px] h-[32px] rounded-full bg-[#B0C9FF] top-[-8px] right-[-8px] absolute"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
