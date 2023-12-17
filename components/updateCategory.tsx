"use client";

import { IResponseCars } from "@/axios/car/AllCar.api";
import { IUpdateCar, UpdateCarApi } from "@/axios/car/updateCar.api";
import { HiPhotograph } from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ChangeEvent, FC, useRef, useState } from "react";

interface IProps {
  closeModal: React.Dispatch<
    React.SetStateAction<{
      id: number;
      edit: boolean;
    }>
  >;
  car: IResponseCars;
}
interface m {
  id: number;

  payload: IUpdateCar;
}

const UpdateCategory: FC<IProps> = ({ car, closeModal }) => {
  const init = {
    name: car.name,
    price: car.price,
    category: car.category,
    carColor: car.carColor,
    cylinders: car.cylinders,
    year: car.year,
    img: car.img,
    make: car.make,
    transmission: car.transmission,
    type: car.type,
    sell: car.sell,
  };

  const client = useQueryClient();
  const [element, setElement] = useState<IUpdateCar>(init);
  const [file, setFile] = useState<File | null>(null);

  const close = () => {
    closeModal((prev) => ({ id: 0, edit: !prev.edit }));
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return "";
    }
    const value = e.target.files[0];
    setFile(value);
  };

  const { mutateAsync } = useMutation({
    mutationFn: UpdateCarApi,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["allCar"] });
      close();
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    const body: IUpdateCar = {
      carColor: element.carColor,
      cylinders: element.cylinders,
      category: element.category,
      make: element.make,
      name: element.name,
      price: element.price,
      year: element.year,
      type: element.type,
      transmission: element.transmission,
      sell: element.sell,
    };

    await mutateAsync({ id: car.id, payload: body });
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof IUpdateCar,
    isNumber: boolean
  ) => {
    const value = isNumber ? e.target.valueAsNumber : e.target.value;
    setElement((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const [openCategory, setOpenCategory] = useState(false);

  const changeOpenCategory = () => {
    setOpenCategory((prev) => !prev);
  };

  return (
    <div className="fixed w-full flex items-center justify-center h-full bg-yellow-600 z-40 inset-0 bg-opacity-25">
      <div className="w-[450px] shadow-xl transition-all ease-in-out duration-100 h-[390px] flex items-start flex-col p-2  overflow-y-auto bg-white rounded-md">
        <div onClick={close} className="self-end p-3 cursor-pointer">
          X
        </div>
        <form className="flex flex-col sm:p-2 items-center" onSubmit={onSubmit}>
          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <input
              placeholder="name of car"
              value={element.name}
              onChange={(e) => onChange(e, "name", false)}
              className="p-2 bg-blue-300 rounded-md focus:outline-none"
            />
            <input
              value={element.make}
              onChange={(e) => onChange(e, "make", false)}
              placeholder="make of car"
              className="p-2  bg-blue-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <input
              placeholder="cylinders of car"
              value={element.cylinders}
              type={"number"}
              onChange={(e) => onChange(e, "cylinders", true)}
              className="p-2 bg-blue-300 rounded-md focus:outline-none"
            />
            <input
              placeholder="year of car"
              value={element.year}
              type={"number"}
              onChange={(e) => onChange(e, "year", true)}
              className="p-2  bg-blue-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <input
              placeholder="type of car"
              value={element.type}
              onChange={(e) => onChange(e, "type", false)}
              className="p-2  bg-blue-300 rounded-md focus:outline-none"
            />
            <input
              placeholder="transmission of car"
              value={element.transmission}
              onChange={(e) => onChange(e, "transmission", false)}
              className="p-2  bg-blue-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <input
              placeholder="price of car"
              value={element.price}
              type={"number"}
              onChange={(e) => onChange(e, "price", true)}
              className="p-2 bg-blue-300 rounded-md focus:outline-none"
            />
            <input
              placeholder="model of car"
              value={element.carColor}
              onChange={(e) => onChange(e, "carColor", false)}
              className="p-2  bg-blue-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <input
              placeholder="name of car"
              value={element.sell}
              onChange={(e) => onChange(e, "sell", false)}
              className="p-2  bg-blue-300 rounded-md focus:outline-none"
            />
            <input
              placeholder="model of car"
              value={element.category}
              onChange={(e) => onChange(e, "category", false)}
              className="p-2 bg-blue-300 rounded-md focus:outline-none"
            />
          </div>

          <input
            ref={inputRef}
            onChange={onChangeFile}
            type={"file"}
            className="p-2 bg-white hidden rounded-md focus:outline-none"
            placeholder="jdj"
          />
          <div
            className="flex items-center"
            data-cy="img"
            onClick={() => inputRef.current?.click()}
          >
            <h1 data-cy="pictures" className="font-bold mr-2">
              add car pictures
            </h1>
            <HiPhotograph size={"30"} />
          </div>
          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <button
              onClick={close}
              className="w-[65px] self-center  h-[45px] p-2 cursor-pointer rounded-md text-white bg-blue-400"
            >
              cancel
            </button>
            <button className="w-[65px] self-center h-[45px] p-2 cursor-pointer rounded-md text-white bg-blue-400">
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
