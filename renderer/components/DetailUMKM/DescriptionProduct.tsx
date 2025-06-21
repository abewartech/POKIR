import Card from "../Card";
import DescriptionPrice from "./DescriptionPrice";

export default function DescriptionProduct() {
  return (
    <Card title="Deskripsi Produk">
      <div className="flex gap-8">
        <div className="w-9/12">
          <div className="leading-[30px] text-[#8A8A8A]">
            Lorem Dolore adipisicing ad ex quis id labore ea ipsum mollit.
            Veniam officia ullamco enim minim tempor cillum pariatur fugiat
            minim est aliquip veniam. Nisi aliqua et tempor in ipsum eu culpa
            culpa eu et qui ad incididunt quis. Quis voluptate officia sunt
            magna ut nisi veniam.
          </div>
        </div>
        <DescriptionPrice />
      </div>
    </Card>
  );
}
