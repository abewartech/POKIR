import Image from "next/image";
import arrowLeft from "../public/arrow-left.svg";
import { useRouter } from "next/navigation";
import { goBack } from "../utils";

export default function BackButton(props) {
  const { className = "" } = props;
  const router = useRouter();
  return (
    <button
      onClick={() => goBack(router)}
      className={`flex items-center gap-3 font-bold cursor-pointer ${className}`}
    >
      <span>
        <Image src={arrowLeft} alt="arrowLeft" />
      </span>
      Kembali
    </button>
  );
}
