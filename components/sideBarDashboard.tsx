import { DataSideBar } from "@/constants";
import Link from "next/link";

const SideBarDashboard = () => {
  return (
    <div className="flex flex-col items-start p-3 ">
      {DataSideBar.map((item) => (
        <Link
          href={`${item.link}`}
          className="flex items-center w-full justify-between p-1 sm:p-2 mt-2 hover:cursor-pointer hover:bg-gray-400"
        >
          <h1 className="font-bold mr-1 md:mr">{item.name}</h1>
          <item.icon />
        </Link>
      ))}
    </div>
  );
};

export default SideBarDashboard;
