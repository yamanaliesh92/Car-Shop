"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

interface IProps {
  options: string[];
}

const SearchCategory: FC<IProps> = ({ options }) => {
  const [openCategory, setOpenCategory] = useState(false);
  const [element, setElement] = useState<string>("");

  const onChanges = (item: string) => {
    console.log("item", item);
    setElement(item);
  };
  const changeOpenCategory = () => {
    console.log("prev");
    setOpenCategory((prev) => !prev);
  };

  console.log("option", options);

  return (
    <div className="w-[200px] ml-20 bg-gray-200 p-4 rounded-md flex items-center justify-between relative">
      <h1 className="font-bold text-primary">
        {element ? element : "category"}
      </h1>
      <AiOutlineArrowDown onClick={changeOpenCategory} />

      {openCategory && (
        <div className="w-[140px]  sm:w-[200px] h-[100px] absolute top-[3.9rem] left-[-2px]">
          <ul className="w-full h-full p-2 bg-white flex rounded-md flex-col  overflow-y-auto">
            {options.map((item) => (
              <Link
                href={`${item}`}
                onClick={() => onChanges(item)}
                className="hover:bg-gray-500 p-1"
              >
                {item}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchCategory;
