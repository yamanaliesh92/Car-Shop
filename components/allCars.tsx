"use client";
import React from "react";

import { useQuery } from "@tanstack/react-query";
import { allCarApi, IResponse } from "@/axios/car/AllCar.api";
import SearchCategory from "./serarchCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CarCard from "./carCard";
import { deleteCarApi } from "@/axios/car/deleteCar.api";

export default function AllCars() {
  const client = useQueryClient();
  const { data: dataCar } = useQuery<IResponse>({
    queryKey: ["allCar"],
    queryFn: allCarApi,
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteCarApi,
  });

  const deleteCar = async (id: number) => {
    const filleter = dates?.filter((item) => item.id !== id);
    await mutateAsync(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["allCar"] });
      },
    });
  };

  const dates = dataCar?.data;

  const categories = [...new Set(dates?.map((item) => item.category))];

  return (
    <div>
      <div className="home__filters ">
        <SearchCategory options={categories} />{" "}
      </div>
      <div className="home__cars-wrapper">
        {dates?.map((item) => {
          return <CarCard car={item} key={item.id} deleteCar={deleteCar} />;
        })}
      </div>
    </div>
  );
}
