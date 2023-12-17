import { Hero } from "@/components";
// import CarByCategory from "@/components/carByCategory";
import dynamic from "next/dynamic";

import React from "react";
const CarByCategory = dynamic(() => import("@/components/carByCategory"));
interface PageProps {
  params: { category: string };
}

export default function page({ params: { category } }: PageProps) {
  console.log("dddddddd", category);
  return (
    <div>
      <Hero />

      <div className="ml-12">
        <CarByCategory category={category} />
      </div>
    </div>
  );
}
