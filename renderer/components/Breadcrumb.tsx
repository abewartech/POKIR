"use client";

import Image from "next/image";
import home from "../public/home.svg";
import { usePathname, useRouter } from "next/navigation";
import { unslugify } from "../utils";

export default function Breadcrumb() {
  const pathname = usePathname();
  const router = useRouter();
  const splitPathName = pathname.split("/").filter(Boolean);

  return (
    <div className="flex">
      <Image src={home} alt="home" />
      {splitPathName.map((item) => (
        <div className="text-[#7B7B7B] font-semibold" key={item}>
          <span className="mx-4">/</span>
          {unslugify(item)}
        </div>
      ))}
    </div>
  );
}
