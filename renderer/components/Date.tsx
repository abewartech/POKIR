import Image from "next/image";
import date from "../public/date.svg";
import dayjs from "dayjs";
import "dayjs/locale/id";

export default function Date(props) {
  const { className = "" } = props;
  const now = dayjs().locale("id").format("DD MMMM YYYY");
  return (
    <>
      <div className="mb-1 text-[#888888] text-[12px]">Tanggal</div>
      <div
        className={`font-bold text-[1rem] flex items-center gap-3 ${className}`}
      >
        <span>
          <Image src={date} alt="date" />
        </span>
        {now}
      </div>
    </>
  );
}
