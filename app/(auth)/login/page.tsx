import Login from "@/components/login";
import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "login",
  description: "welcome in login page",
};

export default function page() {
  return (
    <div className="w-full mt-10 min-h-screen  dark:bg-black dark:text-white items-center flex justify-center bg-white">
      <div className=" bg-black/20   dark:bg-white dark:text-white flex    sm:w-[400px]  items-center">
        <Suspense fallback={"....loading"}>
          <Login />
        </Suspense>
      </div>
    </div>
  );
}
