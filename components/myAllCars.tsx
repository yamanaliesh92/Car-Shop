"use client";
import React from "react";

import { useQuery } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import CarCard from "./carCard";
import { deleteCarApi } from "@/axios/car/deleteCar.api";

import {
  getByUserIdCarApi,
  IResponseMyCar,
} from "@/axios/car/getAllCarByuserId";
import { toast } from "react-hot-toast";

export default function AllMyCars() {
  const client = useQueryClient();
  const { data } = useQuery<IResponseMyCar>({
    queryKey: ["myAllCars"],
    queryFn: getByUserIdCarApi,
  });

  console.log("mycars", { data });

  const { mutateAsync } = useMutation({
    mutationFn: deleteCarApi,
  });

  const deleteCar = async (id: number) => {
    const filleter = data?.data?.cars.filter((item) => item.id !== id);
    await mutateAsync(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["myAllCars"] });
        toast.success("delete car is done ");
      },
    });
  };

  return (
    <div>
      <div className="flex mt-6  ml-10">
        <h1 className="text-2xl text-center font-bold text-red-500">
          welcome in your all cars
        </h1>
      </div>
      <div className="home__cars-wrapper">
        {data?.data?.cars.map((item) => {
          return <CarCard car={item} key={item.id} deleteCar={deleteCar} />;
        })}
      </div>
    </div>
  );
}
