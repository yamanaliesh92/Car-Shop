import AllMyCars from "@/components/myAllCars";

import React from "react";

const TablePage = () => {
  return (
    <div className="flex items-start dark:bg-black dark:text-white w-full overflow-y-auto overflow-x-auto sm:overflow-x-none ">
      {/* <Table /> */}
      <AllMyCars />
    </div>
  );
};

export default TablePage;
