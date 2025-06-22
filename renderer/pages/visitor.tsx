import BackButton from "../components/BackButton";
import Card from "../components/Card";
import { useState } from "react";
import useVisitorStore from "../stores/visitorStore";
import Stepper from "../components/VisitorForm/Stepper";
import Button from "../components/Button";
import { useRouter } from "next/navigation";

export default function Visitor() {
  const { error, postVisitors } = useVisitorStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone_number: "",
    date: "",
    purpose: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value ?? "",
    }));
  };

  const changeStep = (e, step) => {
    e.preventDefault();
    setStep(step);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/response");
    // postVisitors(data);
  };

  return (
    <div className="max-w-[36rem] mx-auto h-screen flex flex-col justify-center py-8 px-4">
      <BackButton className="mb-16" />
      <h2 className="text-center leading-[39px] mb-[16px] text-[2.25rem] font-bold">
        Form Visitor
      </h2>
      <div className="text-center mb-[32px] max-w-[75%] text-[18px] text-[#929292] mx-auto ">
        You will be sent a confirmation mail when your reservation has been
        confirmed
      </div>
      <Card className="px-10 py-14">
        <Stepper step={step} />
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <div className="flex flex-col">
                <label className="mb-2 text-[#444444]">Nama Lengkap</label>
                <input
                  name="name"
                  type="text"
                  value={data.name ?? ""}
                  onChange={handleChange}
                  className="bg-[#EFEFEF] border-[#282828]/5 rounded-[6px] px-4 py-3 mb-6"
                  placeholder="Masukkan Nama Lengkap"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-[#444444]">Email</label>
                <input
                  name="email"
                  type="email"
                  value={data.email ?? ""}
                  onChange={handleChange}
                  className="bg-[#EFEFEF] border-[#282828]/5 rounded-[6px] px-4 py-3 mb-6"
                  placeholder="Masukkan Email"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-[#444444]">No. Telp</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={data.phone_number ?? ""}
                  onChange={handleChange}
                  className="bg-[#EFEFEF] border-[#282828]/5 rounded-[6px] px-4 py-3 mb-6"
                  placeholder="Masukkan No. Telepon"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <label className="mb-2 text-[#444444]">Tanggal</label>
                <input
                  type="date"
                  name="date"
                  value={data.date ?? ""}
                  onChange={handleChange}
                  className="bg-[#EFEFEF] border-[#282828]/5 rounded-[6px] px-4 py-3 mb-6"
                  placeholder="Masukkan No. Telepon"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-[#444444]">Maksud Kunjungan</label>
                <select
                  name="purpose"
                  value={data.purpose ?? ""}
                  onChange={handleChange}
                  className="bg-[#EFEFEF] border-[#282828]/5 rounded-[6px] px-4 py-3 mb-5"
                >
                  <option value="">Pilih Maksud Kunjungan</option>
                  <option value="1">1</option>
                </select>
              </div>
              <div className="flex flex-col invisible ">
                <label className="mb-2 text-[#444444]">No. Telp</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={data.phone_number ?? ""}
                  onChange={handleChange}
                  className="bg-[#EFEFEF] border-[#282828]/5 rounded-[6px] p-4 mb-6"
                  placeholder="Masukkan No. Telepon"
                />
              </div>
            </>
          )}
          <div
            className={`mt-8 flex ${
              step === 1 ? "justify-end" : "justify-between"
            }`}
          >
            {step === 1 ? (
              <button
                type="button"
                onClick={(e) => changeStep(e, 2)}
                className="bg-[#2563EB] w-[110px] rounded-[6px] py-[13px] px-6 text-[#ffffff]
              font-bold cursor-pointer"
              >
                Next
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={(e) => changeStep(e, 1)}
                  className="bg-[#E2E2E2] w-[110px] rounded-[6px] py-[13px] px-6 text-[#444444]
              font-bold cursor-pointer"
                >
                  Kembali
                </button>
                <Button text="Submit" type="submit" />
              </>
            )}
          </div>
        </form>
      </Card>
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}
    </div>
  );
}
