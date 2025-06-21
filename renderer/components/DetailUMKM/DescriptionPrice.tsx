import moneyIcon from "../..//public/money.svg";
import Image from "next/image";

export default function DescriptionPrice() {
  return (
    <div className="bg-[#B0FFB1] p-[24px] rounded-[14px] w-3/8 xl:w-2/8 flex flex-col justify-center">
      <div className="text-[16px] mb-[8px] text-[#219223]">Harga</div>
      <div className="text-[24px] text-[#219223] font-bold leading-[28px] flex gap-3">
        <span>
          <Image src={moneyIcon} alt="money" width={26} height={26} />
        </span>{" "}
        Rp 1.500.000
      </div>
    </div>
  );
}
