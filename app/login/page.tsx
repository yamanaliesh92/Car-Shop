import Login from "@/components/login";
import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "login",
  description: "welcome in login page",
};

export default function page() {
  return (
    <div className="w-full min-h-screen  dark:bg-black dark:text-white items-center flex justify-center bg-gray-50">
      <div className="bg-gray-100  dark:bg-black dark:text-white flex rounded-2xl p-1 shadow-lg sm:w-[400px] sm:p-5 items-center">
        <Suspense fallback={"....loading"}>
          <Login />
        </Suspense>
      </div>
    </div>
  );
}
