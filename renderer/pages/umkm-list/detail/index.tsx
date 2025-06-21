import BackButton from "../../../components/BackButton";
import Breadcrumb from "../../../components/Breadcrumb";
import CurrentDate from "../../../components/DetailUMKM/CurrentDate";
import DescriptionImageVideo from "../../../components/DetailUMKM/DescriptionImageVideo";
import DescriptionProduct from "../../../components/DetailUMKM/DescriptionProduct";
import LinkWebsite from "../../../components/DetailUMKM/LinkWebsite";
import LocationInfo from "../../../components/DetailUMKM/LocationInfo";
import OtherProduct from "../../../components/DetailUMKM/OtherProduct";
import Header from "../../../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen p-7 flex gap-7 max-w-[96rem] mx-auto">
        <div className="w-2/8 xl:w-2/8 sticky top-24 h-fit">
          <CurrentDate />
          <LinkWebsite />
          <LocationInfo />
        </div>
        <div className="w-6/8 xl:w-6/8 flex flex-col">
          <div className="flex justify-between mb-16">
            <BackButton />
            <Breadcrumb />
          </div>
          <DescriptionImageVideo />
          <DescriptionProduct />
          <OtherProduct />
        </div>
      </div>
    </>
  );
}
