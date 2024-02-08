import ChangePassword from "@/components/change-password";
import { Metadata } from "next";

import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "change password",
};

export default function page() {
  return (
    <div className="w-full mt-10 min-h-screen  dark:bg-black dark:text-white items-center flex justify-center bg-white">
      <div className=" bg-black/20 my-4   dark:bg-white dark:text-white flex    sm:w-[400px]  items-center">
        <Suspense fallback={"....loading"}>
          <ChangePassword />
        </Suspense>
      </div>
    </div>
  );
}
