import Card from "../Card";
import DescriptionPrice from "./DescriptionPrice";

export default function DescriptionProduct(props) {
  const { direction = "flex-row", type = "half" } = props;
  return (
    <Card title="Deskripsi Produk">
      <div className={`flex gap-8 ${direction}`}>
        <div className={`${type === "half" ? "w-9/12" : "w-12/12" } `}>
          <div className="leading-[30px] text-[#8A8A8A]">
            Lorem Dolore adipisicing ad ex quis id labore ea ipsum mollit.
            Veniam officia ullamco enim minim tempor cillum pariatur fugiat
            minim est aliquip veniam. 
            Nisi aliqua et tempor in ipsum eu culpa
            culpa eu et qui ad incididunt quis. Quis voluptate officia sunt
            magna ut nisi veniam.
          </div>
        </div>
        {type !== "half" && <div className="border-b "></div>}
        <DescriptionPrice type={type}/>
      </div>
    </Card>
  );
}
