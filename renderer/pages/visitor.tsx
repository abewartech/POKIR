import BackButton from "../components/BackButton";
import Card from "../components/Card";
import { use, useEffect, useState } from "react";
import useVisitorStore from "../stores/visitorStore";
import Stepper from "../components/VisitorForm/Stepper";
import Button from "../components/Button";
import HeaderVisitor from "../components/VisitorForm/HeaderVisitor";
import calendarIcon from "../public/calendar.svg";
import helpIcon from "../public/help_circle.svg";
import idCardIcon from "../public/id_card.svg";
import phoneIcon from "../public/phone.svg";
import userIcon from "../public/user.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

// Schema validasi untuk step 1
const stepOneSchema = Yup.object().shape({
  name: Yup.string().required("Nama lengkap harus diisi"),
  email: Yup.string().email("Email tidak valid").required("Email harus diisi"),
  phone_number: Yup.string()
    .required("Nomor telepon harus diisi")
    .matches(/^[0-9]+$/, "Nomor telepon hanya boleh mengandung angka")
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit"),
});

// Schema validasi untuk step 2
const stepTwoSchema = Yup.object().shape({
  date: Yup.date().required("Tanggal harus diisi"),
  purpose: Yup.string().required("Maksud kunjungan harus dipilih"),
});

export default function Visitor() {
  const { visitData, error, postVisitors } = useVisitorStore();
  const [step, setStep] = useState(1);
  const [touchedStep1, setTouchedStep1] = useState(false);
  const router = useRouter();

  if(visitData.queue_number) {
    router.push("/response");
  }

  const handleSubmit = (values) => {
    postVisitors(values);
    // router.push("/response");
  };

  const nextStep = async (validateForm, setTouched) => {
    setTouchedStep1(true);
    await setTouched({
      name: true,
      email: true,
      phone_number: true,
    });

    const errors = await validateForm();
    const step1Errors = ["name", "email", "phone_number"].some(
      (field) => errors[field]
    );

    if (!step1Errors) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="p-5">
      <BackButton className="mb-14" />
      <div className="max-w-[34rem] mx-auto h-full flex flex-col justify-center ">
        <HeaderVisitor />
        <Card className="px-12 py-14">
          <Stepper step={step} />
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone_number: "",
              date: dayjs().format("YYYY-MM-DD"),
              purpose: "",
            }}
            validationSchema={step === 1 ? stepOneSchema : stepTwoSchema}
            onSubmit={handleSubmit}
          >
            {({ validateForm, setTouched, errors, touched }) => (
              <Form>
                {step === 1 ? (
                  <>
                    <div className="flex flex-col mb-4">
                      <label className="mb-2 text-[#444444]">
                        Nama Lengkap
                      </label>
                      <div className="relative">
                        <Image
                          src={userIcon}
                          alt="user"
                          className="absolute bottom-4 left-3"
                        />
                        <Field
                          name="name"
                          type="text"
                          className={`bg-[#EFEFEF] rounded-[6px] ps-12 w-full pe-4 py-3 mb-1 ${
                            (touchedStep1 || touched.name) && errors.name
                              ? "border border-red-500"
                              : "border-[#282828]/5"
                          }`}
                          placeholder="Masukkan Nama Lengkap"
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <label className="mb-2 text-[#444444]">Email</label>
                      <div className="relative">
                        <Image
                          src={idCardIcon}
                          alt="idCard"
                          className="absolute bottom-4 left-3"
                        />
                        <Field
                          name="email"
                          type="email"
                          className={`bg-[#EFEFEF] rounded-[6px] ps-12 w-full pe-4 py-3 mb-1 ${
                            (touchedStep1 || touched.email) && errors.email
                              ? "border border-red-500"
                              : "border-[#282828]/5"
                          }`}
                          placeholder="Masukkan Email"
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <label className="mb-2 text-[#444444]">No. Telp</label>
                      <div className="relative">
                        <Image
                          src={phoneIcon}
                          alt="phone"
                          className="absolute bottom-4 left-3"
                        />
                        <Field
                          name="phone_number"
                          type="tel"
                          className={`bg-[#EFEFEF] rounded-[6px] ps-12 w-full pe-4 py-3 mb-1 ${
                            (touchedStep1 || touched.phone_number) &&
                            errors.phone_number
                              ? "border border-red-500"
                              : "border-[#282828]/5"
                          }`}
                          placeholder="Contoh: 081234567890 (tanpa tanda baca)"
                        />
                      </div>
                      <ErrorMessage
                        name="phone_number"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col mb-4">
                      <label className="mb-2 text-[#444444]">Tanggal</label>
                      <div className="relative">
                        <Image
                          src={calendarIcon}
                          alt="calendar"
                          className="absolute bottom-4 left-3"
                        />
                        <Field
                          name="date"
                          type="date"
                          disabled
                          className={`bg-[#EFEFEF] rounded-[6px] ps-12 w-full pe-4 py-3 mb-1 ${
                            touched.date && errors.date
                              ? "border border-red-500"
                              : "border-[#282828]/5"
                          }`}
                        />
                      </div>
                      <ErrorMessage
                        name="date"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <label className="mb-2 text-[#444444]">
                        Maksud Kunjungan
                      </label>
                      <div className="relative">
                        <Image
                          src={helpIcon}
                          alt="help"
                          className="absolute bottom-4 left-3"
                        />
                        <Field
                          as="select"
                          name="purpose"
                          className={`bg-[#EFEFEF] rounded-[6px] ps-12 w-full pe-4 py-3 mb-1 ${
                            touched.purpose && errors.purpose
                              ? "border border-red-500"
                              : "border-[#282828]/5"
                          }`}
                        >
                          <option value="">Pilih Maksud Kunjungan</option>
                          <option value="1">Tujuan 1</option>
                          <option value="2">Tujuan 2</option>
                          <option value="3">Tujuan 3</option>
                        </Field>
                      </div>
                      <ErrorMessage
                        name="purpose"
                        component="p"
                        className="text-red-500 text-sm "
                      />
                    </div>
                    <div className="flex flex-col invisible">
                      <label className="mb-2 text-[#444444]">No. Telp</label>
                      <input
                        type="tel"
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
                    <Button
                      text="Next"
                      onClick={() => nextStep(validateForm, setTouched)}
                      type="button"
                    />
                  ) : (
                    <>
                      <Button
                        text="Kembali"
                        bgColor="bg-[#E2E2E2]"
                        color="text-[#444444]"
                        onClick={prevStep}
                        type="button"
                      />
                      <Button text="Submit" type="submit" />
                    </>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </Card>
        <div className="mt-1 text-[#9D9D9D] text-center mb-3">
          Visitor Management System
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}
