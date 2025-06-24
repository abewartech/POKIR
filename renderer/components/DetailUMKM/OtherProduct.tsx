import { useRouter } from "next/router";
import ItemContent from "../ItemContent";

export default function OtherProduct() {
  const router = useRouter();
  return (
    <div>
      <div className="mb-[26px] text-[#3C3C3C] text-[20px] font-bold">
        Produk Lainnya
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {[...Array(4)].map((_, i) => (
          <ItemContent
            action={() => router.push("/umkm-list/detail")}
            title={`Product - ${i + 1}`}
            subtitle="Rp 500.000"
          />
        ))}
      </div>
    </div>
  );
}
