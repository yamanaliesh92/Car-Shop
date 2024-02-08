import { SideBarDashboard } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "dashboard",
  description: "welcome in dashboard page",
};

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full my-12 dark:bg-black dark:text-white grid grid-cols-1 sm:grid-cols-3     sm:p-2 ">
      <div className=" w-[150px] mt-6  sm:w-[200px] h-auto ml-2 md:ml-4 dark:border-r-white  border-b-slate-950 sm:border-b-0  border-b-2 sm:border-r-slate-950 sm:border-r-2 ">
        <SideBarDashboard />
      </div>

      <div className="mt-2 col-span-2  sm:mt-0  h-auto">{children}</div>
    </div>
  );
};

export default DashBoardLayout;
