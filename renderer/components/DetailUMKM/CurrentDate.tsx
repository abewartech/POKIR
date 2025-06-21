import Image from "next/image";
import Card from "../Card";
import date from "../../public/date.svg";

export default function CurrentDate() {
  return (
    <Card>
      <div className="mb-1 text-[#888888] text-[12px]">Tanggal</div>
      <div className="font-bold text-[1rem] flex items-center gap-3">
        <span>
          <Image src={date} alt="date" />
        </span>
        12 Juni 2025
      </div>
    </Card>
  );
}
