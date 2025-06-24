import { useState } from "react";
import BackButton from "../../../components/BackButton";
import Breadcrumb from "../../../components/Breadcrumb";
import CurrentDate from "../../../components/DetailUMKM/CurrentDate";
import DescriptionImageVideo from "../../../components/DetailUMKM/DescriptionImageVideo";
import DescriptionProduct from "../../../components/DetailUMKM/DescriptionProduct";
import LinkWebsite from "../../../components/DetailUMKM/LinkWebsite";
import LocationInfo from "../../../components/DetailUMKM/LocationInfo";
import OtherProduct from "../../../components/DetailUMKM/OtherProduct";
import Header from "../../../components/Header";
import useVisitorStore from "../../../stores/visitorStore";
import Card from "../../../components/Card";
import Date from "../../../components/Date";
import linkIcon from "../../../public/link.svg";
import locationIcon from "../../../public/location.svg";
import Image from "next/image";
import { Slide } from "react-slideshow-image";
import ItemContent from "../../../components/ItemContent";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { layout } = useVisitorStore();
  const [showModal, setShowModal] = useState(false);
  const [showModalLink, setShowModalLink] = useState(false);
  return (
    <>
      <Header />
      {layout !== 3 && (
        <div
          className={`min-h-screen p-7 flex gap-7 max-w-[96rem] mx-auto ${
            layout === 1 ? "flex-row" : layout === 2 ? "flex-row-reverse" : ""
          }`}
        >
          <div className="w-3/12 xl:w-2/8 sticky top-24 h-fit">
            <CurrentDate />
            <LinkWebsite />
            <LocationInfo />
          </div>
          <div className="w-9/12 xl:w-6/8 flex flex-col">
            <div className="flex justify-between mb-8">
              <BackButton />
              <Breadcrumb />
            </div>
            <DescriptionImageVideo />
            <DescriptionProduct />
            <OtherProduct />
          </div>
        </div>
      )}
      {layout === 3 && (
        <div
          className={`h-full overflow-hide flex flex-col justify-center p-7 max-w-[96rem] mx-auto`}
        >
          <div className="flex gap-7">
            <div className="w-9/12 flex flex-col">
              <div className="flex justify-between mb-10">
                <BackButton />
                <Breadcrumb />
              </div>
              <DescriptionImageVideo size="flex-1" />
            </div>
            <div className="w-3/12 flex flex-col">
              <DescriptionProduct direction="flex-col flex-2" type="full" />
              <Card title="Produk Lainnya" className="flex-1">
                <div className="slide-container">
                  <Slide>
                    {[...Array(4)].map((_, i) => (
                      <ItemContent
                        action={() => router.push("/umkm-list/detail")}
                        title={`Product - ${i + 1}`}
                        subtitle="Rp 500.000"
                        isActiveFeedback={false}
                      />
                    ))}
                  </Slide>
                </div>
              </Card>
            </div>
          </div>
          <div className="flex justify-between gap-6">
            <div className="flex gap-5 items-center">
              <div>
                <Date className="bg-[#B0C9FF] text-[#2563EB] px-3 py-1 rounded-[8px]" />
              </div>
              <button
                className="w-[56px] h-[56px] bg-[#B0C9FF] rounded-[10px] flex justify-center items-center"
                onClick={() => setShowModal(true)}
              >
                <Image src={locationIcon} alt="location" />
              </button>
            </div>
            <button
              className="w-[56px] h-[56px] bg-[#B0C9FF] rounded-[10px] flex justify-center items-center"
              onClick={() => setShowModalLink(true)}
            >
              <Image src={linkIcon} alt="linkIcon" />
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg shadow-lg min-w-[400px] relative">
            <LocationInfo />
            <button
              onClick={() => setShowModal(false)}
              className="w-[32px] h-[32px] rounded-full bg-[#B0C9FF] top-[-8px] right-[-8px] absolute"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {showModalLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg shadow-lg min-w-[400px] relative">
            <LinkWebsite />
            <button
              onClick={() => setShowModalLink(false)}
              className="w-[32px] h-[32px] rounded-full bg-[#B0C9FF] top-[-8px] right-[-8px] absolute"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
