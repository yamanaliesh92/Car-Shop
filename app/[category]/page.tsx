import { Hero } from "@/components";
import CarByCategory from "@/components/carByCategory";
import { Metadata } from "next";

import React from "react";

interface PageProps {
  params: { category: string };
}

export default function page({ params: { category } }: PageProps) {
  return (
    <div>
      <Hero />

      <div className="ml-12">
        <CarByCategory category={category} />
      </div>
    </div>
  );
}
