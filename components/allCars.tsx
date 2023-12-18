"use client";
import React from "react";

import { useQuery } from "@tanstack/react-query";
import { allCarApi, IResponse } from "@/axios/car/AllCar.api";
import SearchCategory from "./serarchCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CarCard from "./carCard";
import { deleteCarApi } from "@/axios/car/deleteCar.api";
import { meApi } from "@/axios/user/Me.api";
import { ResponseCreateUser } from "@/axios/user/create_user.api";

export default function AllCars() {
  const client = useQueryClient();
  const { data: dataCar } = useQuery<IResponse>({
    queryKey: ["allCar"],
    queryFn: allCarApi,
  });

  const { data: dateMe } = useQuery<ResponseCreateUser>({
    queryKey: ["me"],
    queryFn: meApi,
  });

  console.log("dateme", dateMe);

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
