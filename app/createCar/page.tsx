import dynamic from "next/dynamic";
import React from "react";

const CreateCategory = dynamic(() => import("@/components/createCategory"));

export default function PageCreateCar() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <CreateCategory />
    </div>
  );
}
