"use client";
import { ICarCardProps } from "@/types";

import React, { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CardDetails } from ".";
import CustomButton from "./customeButton";

import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart";

import { allCarApi, IResponseCars } from "@/axios/car/AllCar.api";
import UpdateCategory from "./updateCategory";

import { getAllUserApi, ResponseUser } from "@/axios/user/getAllUser.api";
import {
  MdAddBox,
  MdDelete,
  MdOutlineSystemSecurityUpdate,
} from "react-icons/md";
import { toast } from "react-hot-toast";

interface IProps {
  car: IResponseCars;
  deleteCar: (id: number) => Promise<void>;
}

const CarCard: FC<IProps> = ({ car, deleteCar }) => {
  const dispatch = useDispatch();

  const addCart = () => {
    dispatch(addToCart(car));
    toast("add to cart is done");
  };

  const { data: dataUser } = useQuery<ResponseUser>({
    queryKey: ["allUser"],
    queryFn: getAllUserApi,
  });

  console.log("dataUser", { dataUser });
  const [open, setOpen] = useState({ id: 0, edit: false });

  const [edit, setEdit] = useState({ idEdit: 0, update: false });

  const changeUpdate = (id: number) => {
    console.log("open", { open });
    setEdit((prev) => ({ idEdit: id, update: !prev.update }));
  };

  const changeOpen = (id: number) => {
    console.log("open", { open });
    setOpen((prev) => ({ id: id, edit: !prev.edit }));
  };

  return (
    <div className="car-card group dark:bg-black dark:text-white">
      <div className="car-card__content">
        <h2 className="car-card__content-title">{car.name}</h2>
        {/* <BsSaveFill size={30} onClick={addCart} title="add to cart" /> */}
        <div className="flex items-center">
          <MdOutlineSystemSecurityUpdate
            size={25}
            cursor="pointer"
            className="mr-2"
            onClick={() => changeUpdate(car.id)}
            title="update"
          />
          <MdDelete
            cursor="pointer"
            onClick={() => deleteCar(car.id)}
            size={25}
            title="deleteCar"
          />
        </div>
        <MdAddBox
          size={25}
          cursor="pointer"
          title="addToCart"
          onClick={addCart}
        />

        {dataUser?.dataUser?.map((item) => (
          <div>
            <div>{item.username} </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center w-full">
        <p className="flex mt-6 items-center text-[32px] leading-[38px] font-extrabold">
          {car.price}
          <span className=" items-center font-bold ml-1 flex text-[14px] leading-[17px]">
            $
          </span>
          <span className="text-[14px] ml-1 leading-[17px] font-medium">
            /day
          </span>
        </p>
        <p className="text-2xl text-red-400 font-bold">{car.sell}</p>
      </div>

      <div className="relative w-full h-40 my-3 object-contain">
        <img src={car.img} alt="car model" className="object-contain" />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-grey">
          <div className="flex flex-col justify-center items-center gap-2">
            <img
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p className="text-[14px] leading-[17px]">{car.transmission}</p>
          </div>
          <div className="car-card__icon">
            <img src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{car.cylinders}</p>
          </div>
          <div className="car-card__icon">
            <img src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{car.type}</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyle="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => changeOpen(car.id)}
          />
        </div>
      </div>

      {open.edit && car.id === open.id ? (
        <>
          <CardDetails open={open} closeModal={setOpen} car={car} />
        </>
      ) : null}

      {edit.update && car.id === edit.idEdit ? (
        <>
          <UpdateCategory closeModal={setOpen} car={car} />
        </>
      ) : null}
    </div>
  );
};

export default CarCard;
