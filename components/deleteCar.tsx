"use client";
import React, { FC } from "react";
import Button from "./button";
import { AiFillDelete } from "react-icons/ai";

interface IProps {
  deleteCar: (id: number) => Promise<void>;
  id: number;
  close: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      id: number;
    }>
  >;
}

const DeleteCar: FC<IProps> = ({ deleteCar, close, id }) => {
  console.log("hellllod");
  return (
    <div className="fixed inset-0 top-3 z-990 bg-red-400 backdrop-blur-sm  h-screen    left-0 flex items-center justify-center">
      <div className="p-4 w-[350px] mt-20 sm:w-[500px] flex flex-col justify-center items-center relative  bg-black/70 dark:bg-white h-fit rounded-md">
        <AiFillDelete
          size={35}
          className="text-black-100 dark:text-white cursor-pointer"
        />
        <h1 className="bold">Confirm Delete</h1>
        <h1> are you sure you want to delete this item ? </h1>
        <div className="flex items-center my-2">
          <Button onClick={async () => await deleteCar(id)}>update</Button>
          <Button
            onClick={() => close((prev) => ({ open: !prev.open, id: 0 }))}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCar;
