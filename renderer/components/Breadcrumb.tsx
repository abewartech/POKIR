import Image from "next/image";
import home from "../public/home.svg";
import { getPathname, unslugify } from "../utils";

export default function Breadcrumb() {
  return (
    <div className="flex">
      <Image src={home} alt="home" />
      {getPathname().map((item) => (
        <div className="text-[#7B7B7B] font-semibold" key={item}>
          <span className="mx-4">/</span>
          {unslugify(item)}
        </div>
      ))}
    </div>
  );
}
