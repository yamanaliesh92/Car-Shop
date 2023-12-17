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
  closeModal: Dispatch<SetStateAction<boolean>>;
}
const CreateCategory: FC<IProps> = ({ closeModal }) => {
  const [element, setElement] = useState<string>("");

  const close = () => {
    closeModal((prev) => !prev);
  };

  const [elementInput, setElementInput] = useState<IPayloadCar>(init);
  const [openNextForm, setOpenNextForm] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const onChangeElement = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof IPayloadCar,
    isNumber: boolean
  ) => {
    const value = isNumber ? e.target.valueAsNumber : e.target.value;
    setElementInput((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  // const changeOpenNextForm = () => {
  //   setOpenNextForm((prev) => !prev);
  // };

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangse = (item: string) => {
    setElement(item);
    setOpenCategory((prev) => !prev);
  };

  const [openCategory, setOpenCategory] = useState(false);

  const changeOpenCategory = () => {
    setOpenCategory((prev) => !prev);
  };

  const moveToNext = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenNextForm((prev) => !prev);
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return "";
    }
    const value = e.target.files[0];
    setFile(value);
  };

  const { mutateAsync, error } = useMutation({
    mutationFn: createCarApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCar"] });
      close();
      toast.success("create car is done");
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("name", elementInput.name);
    formData.append("carColor", elementInput.carColor);
    formData.append("category", element);
    formData.append("make", elementInput.make);
    formData.append("userId", elementInput.userId as any);
    formData.append("cylinders", elementInput.cylinders as any);
    formData.append("year", elementInput.year as any);
    formData.append("type", elementInput.type);
    formData.append("sell", elementInput.sell);
    formData.append("file", file);
    formData.append("transmission", elementInput.transmission);
    formData.append("price", elementInput.price as any);

    await mutateAsync(formData as any);
  };

  // const close = () => {
  //   closeModal(false);
  // };

  return (
    <div
      data-cy="createForm"
      className="p-4 w-[500px] relative bg-blue-300 h-[350px] rounded-md"
    >
      <div onClick={close} className="s flex justify-end">
        X
      </div>
      <form className="flex flex-col p-2 items-center" onSubmit={onSubmit}>
        <h1
          data-cy="title"
          className="text-2xl font-bold focus:border-pink-600  border-b border-b-gray-400 p-2 "
        >
          Create car
        </h1>
        <div
          // onClick={changeOpenNextForm}
          className={`p-1 ${openNextForm ? "hidden" : "block"}`}
        >
          <div className="w-full mt-2 grid grid-cols-2 gap-3">
            <input
              data-cy="nameInput"
              placeholder="name of car"
              name="car"
              value={elementInput.name}
              onChange={(e) => onChangeElement(e, "name", false)}
              required
              className="p-2 bg-white rounded-md focus:outline-none"
            />
            <input
              placeholder="enter your color car"
              data-cy="carColorInput"
              value={elementInput.carColor}
              name="carColor"
              onChange={(e) => onChangeElement(e, "carColor", false)}
              required
              className="p-2 bg-white rounded-md focus:outline-none"
            />
          </div>

          <div className="w-full mt-3 grid grid-cols-2 gap-3">
            <div
              placeholder="year"
              // name="year"
              // onChange={(e) => onChangeElement(e, "year", true)}

              className="relative p-2 bg-white rounded-md focus:outline-none flex justify-between items-center"
            >
              <h1 className="font-bold text-blue-300">
                {element ? element : "category"}
              </h1>
              <AiOutlineArrowDown
                data-cy="categoryButton"
                onClick={changeOpenCategory}
              />
            </div>
            <input
              className="p-2 bg-white rounded-md focus:outline-none"
              name="year"
              placeholder="which year made it"
              data-cy="yearInput"
              required
              type={"number"}
              value={elementInput.year}
              onChange={(e) => onChangeElement(e, "year", true)}
            />
            {openCategory && (
              <div className="w-[140px]  sm:w-[220px] h-[100px] absolute top-[10.4rem] left-[24px]">
                <ul className="w-full h-full p-2  bg-white flex rounded-md flex-col  overflow-y-auto">
                  {categoryDate.map((item) => (
                    <h1
                      key={item.id}
                      data-cy={item.dataCy}
                      onClick={() => onChangse(item.name)}
                      className="hover:bg-gray-500"
                    >
                      {item.name}
                    </h1>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="w-full mt-3 grid grid-cols-2 gap-3">
            <input
              placeholder="enter type your car"
              data-cy="typeInput"
              required
              className="p-2 bg-white rounded-md focus:outline-none"
              value={elementInput.type}
              onChange={(e) => onChangeElement(e, "type", false)}
            />

            <input
              placeholder="cylinders your car"
              value={elementInput.cylinders}
              type={"number"}
              required
              data-cy="cylindersInput"
              onChange={(e) => onChangeElement(e, "cylinders", true)}
              className="p-2 bg-white rounded-md focus:outline-none"
            />
          </div>

          <button
            type="submit"
            onClick={moveToNext}
            data-cy="moveButton"
            className="s self-start rounded-md mt-3 p-2 bg-blue-600 text-white"
          >
            Next
          </button>
        </div>

        <div className={`p-1 ${openNextForm ? "flex" : "hidden"} flex-col`}>
          <div className="w-full mt-3 grid grid-cols-2 gap-3">
            <input
              placeholder="price"
              type={"number"}
              value={elementInput.price}
              data-cy="priceInput"
              required
              name="price"
              onChange={(e) => onChangeElement(e, "price", true)}
              className="p-2 bg-white rounded-md focus:outline-none"
            />
            <select
              value={elementInput.sell}
              required
              name="sell"
              onChange={(e) =>
                setElementInput({ ...elementInput, sell: e.target.value })
              }
              className="p-2 bg-white rounded-md focus:outline-none"
            >
              <option>Rent</option>
              <option>Sale</option>
            </select>
          </div>

          <div className="w-full mt-3 grid grid-cols-2 gap-3">
            <input
              placeholder="enter where did you make it"
              value={elementInput.make}
              data-cy="makeInput"
              onChange={(e) => onChangeElement(e, "make", false)}
              className="p-2 bg-white rounded-md focus:outline-none"
            />

            <select
              value={elementInput.transmission}
              onChange={(e) =>
                setElementInput({
                  ...elementInput,
                  transmission: e.target.value,
                })
              }
              className="p-2 bg-white rounded-md focus:outline-none"
            >
              <option>automatic</option>
              <option>Manual</option>
            </select>
          </div>

          <div className="w-full mt-3 grid grid-cols-2 gap-3">
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
          </div>

          <div className="flex justify-between mt-3 ">
            <button
              type="submit"
              data-cy="perviousButton"
              onClick={moveToNext}
              className="s self-start rounded-md mt-2 p-1  sm:p-2 bg-blue-600 text-white"
            >
              Pervious
            </button>

            <button
              type="submit"
              data-cy="createCategoryButton"
              className="s self-start rounded-md mt-2  p-1 sm:p-2 ml-1 sm:ml-0   bg-blue-600 text-white"
            >
              create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
