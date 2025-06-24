"use client";

import BackButton from "../../components/BackButton";
import Breadcrumb from "../../components/Breadcrumb";
import TitleMenu from "../../components/MainMenu/TitleMenu";
import UMKMProfile from "../../components/UMKMList/UMKMProfile";
import Header from "../../components/Header";
import searchIcon from "../../public/search.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const navigateToDetail = (id) => {
    router.push("/umkm-list/detail");
  };
  return (
    <>
      <Header />
      <div className="p-7 flex flex-col max-w-[96rem] mx-auto">
        <BackButton className="mb-12" />
        <div className="flex justify-between items-center ">
          <TitleMenu
            bgColor="bg-[#B0C9FF]"
            title="UMKM"
            className="mb-[1.25rem]"
          />
          <div className="relative">
            <Image
              src={searchIcon}
              alt="search"
              className="absolute bottom-3 left-4"
            />
            <input
              type="text"
              className="py-2 pe-3 ps-11 rounded-[8px] border border-2 w-[250px]"
              placeholder="Cari UMKM"
            />
          </div>
        </div>
        <Breadcrumb />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {[...Array(8)].map((_, i) => (
            <UMKMProfile key={i} action={() => navigateToDetail(i + 1)} />
          ))}
        </div>
        <div className="mx-auto mt-8">
          <button className="text-[#2563EB] bg-[#B0C9FF] font-bold py-3 px-12 rounded-[12px]">Muat Lebih Banyak</button>
        </div>
      </div>
    </>
  );
}
