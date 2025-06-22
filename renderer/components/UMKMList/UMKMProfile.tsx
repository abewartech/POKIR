export default function UMKMProfile(props) {
  const { action } = props;
  return (
    <div
      className="relative h-[250px] rounded-[18px] bg-[#808080] cursor-pointer transition-transform duration-200 hover:scale-105"
      onClick={action}
    >
      <div className="absolute bottom-4 w-full bg-[#FFFFFF] px-3 py-2 max-w-[90%] rounded-[10px] left-0 right-0 mx-auto">
        <div className="text-[1rem] font-bold">UMKM 1</div>
        <div className="text-[0.75rem] text-[#747474]">Lokasi UMKM</div>
      </div>
    </div>
  );
}
