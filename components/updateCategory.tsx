"use client";

import { IResponseCars } from "@/axios/car/AllCar.api";
import { IUpdateCar, UpdateCarApi } from "@/axios/car/updateCar.api";
import { HiPhotograph } from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ChangeEvent, FC, useRef, useState } from "react";
import { UpdateImgCarApi } from "@/axios/car/update.img.api";
import { toast } from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./input";
import Button from "./button";

interface IProps {
  closeModal: React.Dispatch<
    React.SetStateAction<{
      idEdit: number;
      update: boolean;
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
  const [open, setOpen] = useState(false);

  const close = () => {
    console.log("updatesddddddd");
    closeModal((prev) => ({ idEdit: 0, update: false }));
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return "";
    }
    const value = e.target.files[0];
    setFile(value);
  };

  const schema = z.object({
    name: z.string().min(2).max(22),
    carColor: z.string().min(2).max(22),
    category: z.string().min(2),
    sell: z.string().min(2),
    price: z.number().min(2),
    year: z.number().min(2),
    make: z.string().min(2),
    transmission: z.string().min(2),
    type: z.string().min(2),

    cylinders: z.number().min(2),
    password: z.string().min(2).max(20),
  });

  type Schema = z.infer<typeof schema>;

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const openImg = () => {
    setOpen((prev) => !prev);
    inputRef.current?.click();
  };

  const { mutateAsync } = useMutation({
    mutationFn: UpdateCarApi,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["allCar"] });
      {
        !open && close();
      }
    },
  });

  const { mutateAsync: mutateAsyncImg } = useMutation({
    mutationFn: UpdateImgCarApi,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["allCar"] });
      close();
      toast("update is doen");
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    const form = new FormData();
    if (!file) {
      return;
    }
    form.append("img", file);

    {
      open && (await mutateAsyncImg({ id: car.id, img: form as any }));
    }
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
    <div className="fixed inset-0 top-3 z-990 bg-white/80 dark:bg-black/80 backdrop-blur-sm  h-screen    left-0 flex items-center justify-center">
      <div className="p-4 w-[350px] mt-20 sm:w-[500px] relative  bg-black/70 dark:bg-white h-fit rounded-md">
        <div onClick={close} className="self-end mt-2 ml-3 p-3 cursor-pointer">
          X
        </div>
        <form className="flex flex-col sm:p-2 items-center" onSubmit={onSubmit}>
          <div className="w-full  grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <Input
                value={element.name}
                {...register("name", { value: car.name })}
                type="text"
                label="Name"
              />
            </div>
            <div className="flex flex-col">
              <Input
                value={element.make}
                {...register("make", { value: car.make })}
                type="text"
                label="Make"
              />
            </div>
          </div>
          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <Input
                value={element.year}
                {...register("year", { value: car.year, valueAsNumber: true })}
                type="number"
                label="Year"
              />
            </div>

            <div className="flex flex-col">
              <Input
                value={element.cylinders}
                {...register("cylinders", {
                  value: car.cylinders,
                  valueAsNumber: true,
                })}
                type="number"
                label="Cylinders"
              />
            </div>
          </div>

          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <Input
                value={element.type}
                {...register("type", { value: car.type })}
                type="text"
                label="Type"
              />
            </div>

            <div className="flex flex-col">
              <Input
                value={element.transmission}
                {...register("transmission", { value: car.transmission })}
                type="text"
                label="Transmission"
              />
            </div>
          </div>
          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <Input
                value={element.price}
                {...register("price", {
                  value: car.price,
                  valueAsNumber: true,
                })}
                type="number"
                label="Price"
              />
            </div>

            <div className="flex flex-col">
              <Input
                value={element.carColor}
                {...register("carColor", { value: element.carColor })}
                type="text"
                label="CarColor"
              />
            </div>
          </div>
          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <Input
                {...register("sell", { value: car.sell })}
                type="text"
                label="Sell"
              />
            </div>

            <div className="flex flex-col">
              <Input
                {...register("category", { value: car.category })}
                type="text"
                label="Category"
              />
            </div>
          </div>

          <input
            ref={inputRef}
            onChange={onChangeFile}
            type={"file"}
            className="p-2 bg-white hidden rounded-md focus:outline-none"
            placeholder="jdj"
          />
          <div
            className="flex items-center mt-2 "
            data-cy="img"
            onClick={openImg}
          >
            <h1
              data-cy="pictures"
              className="mr-2 text-white dark:text-black-100"
            >
              to change img click here
            </h1>
            <HiPhotograph
              className=" text-white dark:text-black-100"
              size={"30"}
            />
          </div>

          <Button>update</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
