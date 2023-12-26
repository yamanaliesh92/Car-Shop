import Info from "@/components/info";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    nocache: true,
  },
};

export default function InfoPage() {
  return (
    <div className="w-full  flex flex-col sm:items-center sm:justify-center">
      <Info />
    </div>
  );
}
