import { useEffect, useRef, useState } from "react";
import layoutMain from "../public/layout_main.svg";
import layoutSecond from "../public/layout_second.svg";
import layoutThird from "../public/layout_third.svg";
import Image from "next/image";
import useVisitorStore from "../stores/visitorStore";
import { usePathname } from "next/navigation";
import { getPathname } from "../utils";
import Link from "next/link";

export default function Header() {
  const { layout, setLayout } = useVisitorStore();
  const [open, setOpen] = useState(false);
  const menuRef: any = useRef();
  // console.log();
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selecLayout = (layout) => {
    setLayout(layout);
    setOpen((prev) => !prev);
  };

  return (
    <header className="py-3 sticky top-0 bg-[#ffffff] w-full z-20">
      <div className="flex max-w-[96rem] justify-between mx-auto px-7">
        <div className="w-5/7">
          <div className="px-8 py-1 font-bold text-[1.5rem] bg-[#A1A1AA] w-fit h-full ">
            Logo
          </div>
        </div>
        <div className="w-2/7 flex items-center gap-10 justify-end">
          <nav>
            <ol className="flex justify-end gap-10">
              <li className="text-[1rem]">
                <Link href="/umkm-list">UMKM</Link>
              </li>
              <li className="text-[1rem]">
                <Link href="/visitor">Visitor</Link>
              </li>
              <li className="text-[1rem]">
                <Link href="/spartan">SPARTAN</Link>
              </li>
               <li className="text-[1rem]">
                <Link href="#">Wayfinder</Link>
              </li>
            </ol>
          </nav>
          <div className="relative inline-block text-left" ref={menuRef}>
            {getPathname()[1] === "detail" && (
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#E7E7E7] px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs cursor-pointer hover:bg-[#E7E7E7]/75"
                id="menu-button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen((prev) => !prev)}
              >
                <Image
                  src={
                    layout === 1
                      ? layoutMain
                      : layout === 2
                      ? layoutThird
                      : layoutSecond
                  }
                  alt="icon"
                />
              </button>
            )}
            {open && (
              <div
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                    onClick={() => selecLayout(1)}
                  >
                    <span>
                      <Image src={layoutMain} alt="main" />
                    </span>
                    Layout 1
                  </a>
                  <a
                    href="#"
                    className="flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-1"
                    onClick={() => selecLayout(2)}
                  >
                    <span>
                      <Image src={layoutThird} alt="second" />
                    </span>
                    Layout 2
                  </a>
                  <a
                    href="#"
                    className="flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-2"
                    onClick={() => selecLayout(3)}
                  >
                    <span>
                      <Image src={layoutSecond} alt="third" />
                    </span>
                    Layout 3
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
