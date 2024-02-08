"use client";

import { HiPhotograph } from "react-icons/hi";
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { AiOutlineArrowDown } from "react-icons/ai";
import { IPayloadCar } from "@/types";
import { createCarApi } from "@/axios/car/createCar";
import { categoryDate } from "@/constants";

import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "./input";
import Button from "./button";
const init: IPayloadCar = {
  name: "",
  carColor: "",
  category: "",
  userId: 0,
  sell: "",
  price: 0,
  year: 0,
  make: "",
  transmission: "",
  type: "",
  cylinders: 0,
};

interface IProps {
  closeModal?: Dispatch<SetStateAction<boolean>>;
}
const CreateCategory: FC<IProps> = ({ closeModal }) => {
  const [element, setElement] = useState<string>("");

  const close = () => {
    closeModal && closeModal((prev) => !prev);
  };

  const [file, setFile] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const onChanges = (item: string) => {
    setElement(item);
    setOpenCategory((prev) => !prev);
  };

  const [openCategory, setOpenCategory] = useState(false);

  const changeOpenCategory = () => {
    setOpenCategory((prev) => !prev);
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return "";
    }
    const value = e.target.files[0];
    setFile(value);
  };

  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: createCarApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCar"] });
      close();
      toast.success("create car is done");
    },
  });

  const schema = z.object({
    name: z.string().min(2).max(22),
    carColor: z.string(),

    sell: z.string(),
    price: z.number(),
    year: z.number(),
    make: z.string(),
    transmission: z.string(),
    type: z.string().min(2),

    cylinders: z.number(),
  });

  type Schema = z.infer<typeof schema>;

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const onSubmits = async (data: Schema) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("carColor", data.carColor);
    formData.append("category", element);
    formData.append("make", data.make);

    formData.append("cylinders", String(data.cylinders));
    formData.append("year", String(data.year));
    formData.append("type", data.type);
    formData.append("sell", data.sell);
    formData.append("img", file);
    formData.append("transmission", data.transmission);
    formData.append("price", String(data.price));

    await mutateAsync(formData as any);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm  h-screen top-0   left-0 flex items-center justify-center">
      <div
        data-cy="createForm"
        className="p-4 w-[350px] sm:w-[500px] relative  bg-black/70 dark:bg-white h-fit rounded-md"
      >
        <div className="flex justify-between border-b border-b-gray-400">
          <h1
            data-cy="title"
            className="text-[20px] text-white dark:text-black font-bold   p-2 "
          >
            Create car
          </h1>
          <h1
            onClick={close}
            className="cursor-pointer text-white dark:text-black text-2xl"
          >
            X
          </h1>
        </div>
        <form
          noValidate
          className="flex flex-col p-2 items-center"
          onSubmit={handleSubmit(onSubmits)}
        >
          {error && <h1 className="error">{error.message}</h1>}
          <div className="w-full  grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <p className="error">{errors.name?.message}</p>

              <Input
                {...register("name")}
                label="Name"
                data_cy="nameInput"
                type="text"
              />
            </div>

            <div className="flex flex-col">
              <p className="error">{errors.carColor?.message}</p>

              <Input
                {...register("carColor")}
                label="CarColor"
                type="text"
                data_cy="carColorInput"
              />
            </div>
          </div>

          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <div className="flex flex-col ">
              <label className=" text-white mt-1 dark:text-black text-[14px]">
                Category
              </label>

              <div
                placeholder="year"
                className="relative  p-2 mt-1 h-[35px] rounded-xl border w-[130px] sm:w-full bg-white text-black dark:bg-white dark:text-black  outline-0 text-sm  border-white dark:border-black   placeholder:text-black focus:dark:border-green-400 focus:border-red-900 flex justify-between items-center"
              >
                <h1 className="font-bold dark:text-black-100 text-white">
                  {element ? element : "category"}
                </h1>
                <AiOutlineArrowDown
                  data-cy="categoryButton"
                  onClick={changeOpenCategory}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="error">{errors.year?.message}</p>

              <Input
                {...register("year", { valueAsNumber: true })}
                label="Year"
                type="number"
                data_cy="yearInput"
              />
            </div>

            {openCategory && (
              <div className="w-[140px]  sm:w-[190px] h-[100px] absolute top-[13.4rem] left-[54px]">
                <ul className="w-full h-full p-2  bg-white flex rounded-md flex-col  overflow-y-auto">
                  {categoryDate.map((item) => (
                    <h1
                      key={item.id}
                      data-cy={item.dataCy}
                      onClick={() => onChanges(item.name)}
                      className="hover:bg-primary"
                    >
                      {item.name}
                    </h1>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <p className="error">{errors.type?.message}</p>

              <Input
                {...register("type")}
                label="Type"
                type="text"
                data_cy="typeInput"
              />
            </div>

            <div className="flex flex-col">
              <p className="error">{errors.cylinders?.message}</p>

              <Input
                {...register("cylinders", { valueAsNumber: true })}
                label="Cylinders"
                type="number"
                data_cy="cylindersInput"
              />
            </div>
          </div>

          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <p className="error">{errors.price?.message}</p>

              <Input
                {...register("price", { valueAsNumber: true })}
                label="Price"
                type="number"
                data_cy="priceInput"
              />
            </div>

            <div className="flex flex-col">
              <label
                className="text-white dark:text-black text-[14px]"
                htmlFor="sell"
              >
                Sell
              </label>

              <select
                id="sell"
                {...register("sell")}
                name="sell"
                className="p-2 mt-1 h-[35px] rounded-xl border w-[130px] sm:w-full bg-white text-black dark:bg-white dark:text-black  outline-0 text-sm  border-white dark:border-black   placeholder:text-black focus:dark:border-green-400 focus:border-red-900 "
              >
                <option>Rent</option>
                <option>Sale</option>
              </select>
            </div>
          </div>

          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <p className="error">{errors.make?.message}</p>

              <Input
                {...register("make")}
                label="Make"
                type="text"
                data_cy="makeInput"
              />
            </div>

            <div className="flex flex-col">
              <label
                className="text-white mt-1 dark:text-black text-[14px]"
                htmlFor="transmission"
              >
                Transmission
              </label>
              <select
                id="transmission"
                {...register("transmission")}
                className="p-2 mt-1 h-[35px] rounded-xl border w-[130px] sm:w-full bg-white text-black dark:bg-white dark:text-black  outline-0 text-sm  border-white dark:border-black   placeholder:text-black focus:dark:border-green-400 focus:border-red-900 "
              >
                <option>automatic</option>
                <option>Manual</option>
              </select>
            </div>
          </div>

          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <input
              ref={inputRef}
              onChange={onChangeFile}
              type={"file"}
              className="p-2 bg-white hidden rounded-md focus:outline-none"
              placeholder="jdj"
            />
            <div
              className="flex items-center cursor-pointer"
              data-cy="img"
              onClick={() => inputRef.current?.click()}
            >
              <h1
                data-cy="pictures"
                className="font-bold mr-1 text-[13px] sm:text-[17px] sm:mr-2 text-white dark:text-black-100"
              >
                add car pictures
              </h1>
              <HiPhotograph
                className="text-white dark:text-black-100"
                size={"30"}
              />
            </div>
          </div>

          <Button isLoading={isPending}>Create</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
