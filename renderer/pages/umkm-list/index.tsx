"use client";

import BackButton from "../../components/BackButton";
import Breadcrumb from "../../components/Breadcrumb";
import TitleMenu from "../../components/MainMenu/TitleMenu";
import UMKMProfile from "../../components/UMKMList/UMKMProfile";
import Header from "../../components/Header";
import umkmIcon from "../../public/umkm.svg";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToDetail = (id) => {
    router.push("/umkm-list/detail");
  };
  return (
    <>
      <Header />
      <div className="p-7 flex flex-col max-w-[96rem] mx-auto">
        <BackButton className="mb-16" />
        <TitleMenu
          bgColor="bg-[#B0C9FF]"
          icon={umkmIcon}
          title="UMKM"
          className="mb-[1.5rem]"
        />
        <Breadcrumb />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {[...Array(5)].map((_, i) => (
            <UMKMProfile key={i} action={() => navigateToDetail(i + 1)} />
          ))}
        </div>
      </div>
    </>
  );
}
