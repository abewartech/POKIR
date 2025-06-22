import Image from "next/image";

export default function TitleMenu(props) {
  const { bgColor, icon = "", title, className = "mb-[3rem]" } = props;
  return (
    <div className={`flex gap-4 items-center ${className}`}>
      {icon && (
        <div
          className={`w-[53px] h-[53px] ${bgColor} rounded-full flex justify-center`}
        >
          <Image src={icon} alt="icon" />
        </div>
      )}
      <div className="text-[2.25rem] font-bold text-[#3C3C3C]">{title}</div>
    </div>
  );
}
