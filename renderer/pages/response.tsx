import Image from "next/image";
import checkIcon from "../public/check-stepper.svg";
import { useRouter } from "next/router";
import useVisitorStore from "../stores/visitorStore";

export default function Response() {
  const router = useRouter();
  const { visitData } = useVisitorStore();


  return (
    <div className="max-w-[30rem] mx-auto h-screen flex flex-col justify-center py-8 px-4">
      <div className="flex flex-col items-center">
        <div className="mb-4 bg-[#42B55A] w-[90px] h-[90px] flex justify-center p-4 rounded-full animate-heartbeat">
          <Image src={checkIcon} alt="Success" width={56} height={56} />
        </div>
        <h2 className="text-center leading-[39px] mb-3 text-[2.25rem] font-bold text-[#474747]">
          Berhasil Mengisi Form!
        </h2>
        <div className="text-center mb-7 text-[18px] text-[#929292]">
          Nomor antrian Anda adalah
        </div>
        <div className="flex justify-center mb-7">
          <span className="inline-block bg-[#AAFFBC] text-[#42B55A] px-12 py-4 rounded-[12px] text-[6rem] font-bold">
            {visitData.queue_number}
          </span>
        </div>
        {/* <div className="mt-4 p-4 w-full bg-red-100 border border-red-400 text-red-700 rounded">
          Error: Error
        </div> */}
        <div className="text-center text-[18px] text-[#929292]">
          Silakan tunggu sebentar untuk proses pencetakan nomor antrian Anda.
        </div>
        {/* <button
          className="mt-10 bg-[#2563EB] w-full rounded-[6px] py-[13px] px-6 text-[#ffffff]
              font-bold cursor-pointer"
        >
          Print Manual
        </button>
        <div className="my-6 text-[#929292]">atau</div>
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="bg-[#E2E2E2] w-full rounded-[6px] py-[13px] px-6 text-[#444444]
              font-bold cursor-pointer"
        >
          Kembali Ke Halaman Awal
        </button> */}
      </div>
    </div>
  );
}
