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
    <div className="w-full  dark:bg-black dark:text-white min-h-screen items-center flex justify-center bg-gray-50">
      <div className="bg-gray-100 dark:bg-black dark:text-white flex rounded-2xl p-1 shadow-lg sm:w-[400px] sm:p-5 items-center">
        <Suspense fallback={"loading...."}>
          <Sign />
        </Suspense>
      </div>
    </div>
  );
}
