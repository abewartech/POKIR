export default function DataSummary(props) {
  const { subtitle, bgColor, textColor, value } = props;
  return (
    <div className="flex justify-between items-center ">
      <div className="text-[#838383]">{subtitle}</div>
      <div
        className={`py-3 px-10 rounded-[10px] text-[32px] font-bold ${bgColor} ${textColor} leading-7`}
      >
        {value}
      </div>
    </div>
  );
}
