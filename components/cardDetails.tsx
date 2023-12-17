"use client";
import { IResponseCars } from "@/axios/car/AllCar.api";

import React, { FC } from "react";

interface IPropsCardDetails {
  open: {
    id: number;
    edit: boolean;
  };
  closeModal: React.Dispatch<
    React.SetStateAction<{
      id: number;
      edit: boolean;
    }>
  >;
  car: IResponseCars;
}

const CardDetails: FC<IPropsCardDetails> = ({ open, closeModal, car }) => {
  const onChangeOpen = () => {
    closeModal((prev) => ({ ...prev, edit: !prev.edit }));
  };

  return (
    <div className="fixed w-full flex items-center justify-center h-full bg-yellow-600 z-40 inset-0 bg-opacity-25 ">
      <div className="w-[550px] shadow-xl transition-all ease-in-out duration-100 h-[550px] flex items-start flex-col p-2 dark:bg-black dark:text-white  overflow-y-auto bg-white rounded-md">
        <div className="self-end p-3 cursor-pointer" onClick={onChangeOpen}>
          X
        </div>
        <div className="relative w-full bg-center bg-cover bg-pattern h-40 rounded-lg">
          <img
            src={car.img}
            alt="hero"
            className="object-contain w-[100%] h-full"
          />
        </div>
        <div className="flex flex-col mt-3 w-full">
          <div className="flex justify-between w-full mt-3 border-b-gray-400">
            <h4 className="text-gray-500">Year</h4>
            <p className="text-black-100">{car.year}</p>
          </div>
          <div className="flex justify-between w-full mt-3 border-b-gray-400">
            <h4 className=" text-gray-500">Type</h4>
            <p className="text-black-100">{car.type}</p>
          </div>

          <div className="flex justify-between w-full mt-3 border-b-gray-400">
            <h4 className="text-gray-500"> make </h4>
            <p className="text-black-100">{car.make}</p>
          </div>

          <div className="flex justify-between w-full mt-3 border-b-gray-400">
            <h4 className="text-gray-500">Year</h4>
            <p className="text-black-100">{car.year}</p>
          </div>

          <div className="flex justify-between w-full mt-3 border-b-gray-400">
            <h4 className="text-gray-500">fuel_type</h4>
            <p className="text-black-100">{car.type}</p>
          </div>

          <div className="flex justify-between w-full mt-3 border-b-gray-400">
            <h4 className="text-gray-500">displacement</h4>
            <p className="text-black-100">{car.carColor}</p>
          </div>

          <div className="flex justify-between w-full mt-3 border-b-gray-400">
            <h4 className="text-gray-500">transmission</h4>
            <p className="text-black-100">{car.transmission}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
