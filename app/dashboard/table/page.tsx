import AllMyCars from "@/components/myAllCars";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  robots: {
    index: false,
    nocache: true,
  },
};

const TablePage = () => {
  return (
    <div className="flex items-start mt-6 dark:bg-black dark:text-white w-full overflow-y-auto overflow-x-auto sm:overflow-x-none ">
      <AllMyCars />
    </div>
  );
};

export default TablePage;
