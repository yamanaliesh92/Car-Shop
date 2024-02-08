import Sign from "@/components/sign";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    absolute: "sign Up",
  },
  description: "welcome in sign page",
};

export default function page() {
  return (
    <div className="w-full mt-10 min-h-screen  dark:bg-black dark:text-white items-center flex justify-center bg-white">
      <div className="bg-black/20   dark:bg-white dark:text-white flex    sm:w-[400px]  items-center">
        <Suspense fallback={"loading...."}>
          <Sign />
        </Suspense>
      </div>
    </div>
  );
}
