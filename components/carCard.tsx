"use client";

import React, { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CardDetails } from ".";

import { useDispatch } from "react-redux";

import { IResponseCars } from "@/axios/car/AllCar.api";
import UpdateCategory from "./updateCategory";

import { getAllUserApi, ResponseUser } from "@/axios/user/getAllUser.api";
import {
  MdAddBox,
  MdDelete,
  MdOutlineSystemSecurityUpdate,
} from "react-icons/md";
import { toast } from "react-hot-toast";
import { ResponseCreateUser } from "@/axios/user/create_user.api";
import { meApi } from "@/axios/user/Me.api";
import { addToCart } from "@/redux/cart";
import Image from "next/image";
import DeleteCar from "./deleteCar";

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

  const { data: dateMe } = useQuery<ResponseCreateUser>({
    queryKey: ["me"],
    queryFn: meApi,
  });

  console.log("dataUser", dataUser);
  const [open, setOpen] = useState({ id: 0, edit: false });

  const [edit, setEdit] = useState({ idEdit: 0, update: false });

  const [openDeleteModel, setOpenDeleteModel] = useState({
    open: false,
    id: 0,
  });

  const changeOpenDeleteModel = (id: number) => {
    console.log("open", { open });
    alert("EEEEEEEEEEEEEEE");
    setOpenDeleteModel((prev) => ({ open: true, id: id }));
  };

  const changeUpdate = (id: number) => {
    console.log("open", { open });
    setEdit((prev) => ({ idEdit: id, update: !prev.update }));
  };

  const changeOpen = (id: number) => {
    console.log("open", { open });
    setOpen((prev) => ({ id: id, edit: !prev.edit }));
  };

  return (
    <div className="car-card group dark:bg-white dark:text-black">
      <div className="car-card__content">
        <h2 data-cy={`name${car.id}`} className="car-card__content-title">
          {car.name}
        </h2>
        <div className="flex items-center">
          {/* {dateMe && dateMe.id == !car.userId && ( */}
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
              onClick={() => changeOpenDeleteModel(car.id)}
              size={25}
              title="deleteCar"
              className="dark:text-black-100 text-white"
            />
          </div>
          {/* )} */}
          <MdAddBox
            size={25}
            cursor="pointer"
            title="addToCart"
            className="ml-2 text-white dark:text-black-100"
            onClick={addCart}
          />
          <h1 onClick={() => changeOpen(car.id)}>change</h1>
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <p
            data-cy={`price${car.id}`}
            className="flex mt-6 items-center text-dangerous text-[22px] leading-[38px] font-extrabold"
          >
            {car.price}
            <span className=" items-center font-bold ml-1 flex text-[14px] leading-[17px]">
              $
            </span>
          </p>
        </div>
        <p className="text-[17px] text-secondry font-bold">{car.sell}</p>
      </div>

      {dataUser?.data?.map((items) => (
        <div className="fle flex flex-col">
          {car.userId === items.id && (
            <>
              <div className="fle flex items-center my-2">
                <h1 className="info">the owner:</h1>
                <h1 className="font-bold text-dangerous dark:text-primary ">
                  {items.username}{" "}
                </h1>
              </div>
              <div className="fle flex items-center my-2">
                <h1 className="info">the owner number:</h1>
                <h1 className="font-bold text-dangerous dark:text-primary">
                  {items.number}{" "}
                </h1>
              </div>
            </>
          )}
        </div>
      ))}

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          width={220}
          loader={() => car.img}
          height={220}
          src={car.img}
          alt="car model"
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-4">
        <div className="flex  w-full justify-between text-grey">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p data-cy={`transmission${car.id}`} className="info">
              {car.transmission}
            </p>
          </div>
          <div className="car-card__icon">
            <img src="/tire.svg" width={20} height={20} alt="seat" />
            <p data-cy={`cylinders${car.id}`} className="info">
              {car.cylinders}
            </p>
          </div>
          <div className="car-card__icon">
            <img src="/gas.svg" width={20} height={20} alt="seat" />
            <p data-cy={`type${car.id}`} className="info">
              {car.type}
            </p>
          </div>
        </div>
      </div>

      {open.edit && car.id === open.id ? (
        <>
          <CardDetails open={open} closeModal={setOpen} car={car} />
        </>
      ) : null}

      {openDeleteModel.open && car.id === open.id && (
        <>
          <DeleteCar
            deleteCar={deleteCar}
            id={car.id}
            close={setOpenDeleteModel}
          />
          <h1 className="w-[400px] h-[40px] bg-red-800">ddddddddddddd</h1>
        </>
      )}

      {edit.update && car.id === edit.idEdit && (
        <>
          <UpdateCategory closeModal={setEdit} car={car} />
        </>
      )}
    </div>
  );
};

export default CarCard;
