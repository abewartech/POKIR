export default function DescriptionImageVideo(props) {
  const { size = "h-[615px]" } = props;
  return (
    <div
      className={`rounded-[18px] shadow-lg w-full p-6 mb-8 bg-[#FFFFFF] ${size}`}
    ></div>
  );
}
