import dynamic from "next/dynamic";

import React, { Suspense } from "react";
const ChangePassword = dynamic(() => import("@/components/change-password"));

export default function page() {
  return (
    <div className="w-full min-h-screen items-center flex justify-center bg-gray-50">
      <div className="bg-gray-100 flex rounded-2xl p-1 shadow-lg sm:w-[400px] sm:p-5 items-center">
        <Suspense fallback={"....loading"}>
          <ChangePassword />
        </Suspense>
      </div>
    </div>
  );
}
