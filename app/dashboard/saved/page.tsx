import dynamic from "next/dynamic";
import React from "react";
const Saved = dynamic(() => import("@/components/saved"));

export default function PageSaved() {
  return (
    <div className="w-full h-full  flex flex-col dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold text-red-300 self-center">
        Welcome in your save
      </h1>
      <Saved />
    </div>
  );
}
