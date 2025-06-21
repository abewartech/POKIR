import linkIcon from "../../public/link.svg";
import Image from "next/image";

export default function LinkItem(props) {
  const { idx, link } = props;
  return (
    <div
      className={`p-3 flex gap-3 bg-[${idx % 2 ? "#FFFFFF" : "#F8F8F8"}] mb-2`}
    >
      <div className="w-[32px] h-[32px] rounded-[6px] shrink-0 bg-[#B0C9FF] flex justify-center">
        <Image src={linkIcon} alt="link" width={24} height={24} />
      </div>
      <div className="text-[1rem] text-ellipsis overflow-hidden  flex flex-col justify-center">
        {link}
      </div>
    </div>
  );
}
