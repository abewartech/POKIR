import Card from "../Card";

export default function LocationInfo() {
  return (
    <Card title="Lokasi Bogor">
      <div className="flex">
        <div className="w-1/2">
          <div className="text-[12px] mb-1 text-[#8A8A8A]">Latitude</div>
          <div className="font-bold mb-3">-6.59167000 </div>
        </div>
        <div className="w-1/2">
          <div className="text-[12px] mb-1 text-[#8A8A8A]">Longitude</div>
          <div className="font-bold mb-3">106.80000000</div>
        </div>
      </div>
      <div className="text-[12px] mb-1 text-[#8A8A8A]">Maps</div>
      <div className="w-auto h-[180px] bg-[#A1A1AA] rounded-[8px]"></div>
    </Card>
  );
}
