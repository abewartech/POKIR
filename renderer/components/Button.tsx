export default function Button(props) {
  const {
    bgColor = "bg-[#2563EB]",
    width = "w-[110px]",
    rounded = "rounded-[6px]",
    color = "text-[#ffffff]",
    type = "button",
    text,
  } = props;
  return (
    <button
      type={type}
      className={`${bgColor} ${width} ${rounded} ${color} py-[13px] px-6 font-bold cursor-pointer`}
    >
      {text}
    </button>
  );
}
