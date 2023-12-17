import dynamic from "next/dynamic";

const Info = dynamic(() => import("@/components/info"));

export default function InfoPage() {
  return (
    <div className="w-full  flex flex-col sm:items-center sm:justify-center">
      <Info />
    </div>
  );
}
