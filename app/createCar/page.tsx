import CreateCategory from "@/components/createCategory";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "createCar page",
  description: "welcome in createCar page",
};

export default function PageCreateCar() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <CreateCategory />
    </div>
  );
}
