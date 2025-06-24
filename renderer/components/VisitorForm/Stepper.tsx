import Image from "next/image";
import checkStepper from "../../public/check-stepper.svg";

export default function Stepper(props) {
  const { step } = props;
  return (
    <ol className="flex items-center justify-center mx-10 mb-[42px]">
      <li
        className={`flex w-[200px] items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-[200px] after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block ${
          step === 1 ? "" : "dark:after:border-blue-800"
        }`}
      >
        <span
          className={`flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0 font-bold text-[#fff]`}
        >
          {step === 1 ? 1 : <Image src={checkStepper} alt="stepper-check" />}
        </span>
      </li>
      <li className="flex items-center">
        <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 shrink-0 font-bold text-blue-500">
          2
        </span>
      </li>
    </ol>
  );
}
