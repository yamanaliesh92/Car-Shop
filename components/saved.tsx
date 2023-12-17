"use client";

import { allCarApi, IResponse, IResponseCars } from "@/axios/car/AllCar.api";
import React from "react";
import { useSelector } from "react-redux";
import { CarCard } from ".";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCarApi } from "@/axios/car/deleteCar.api";

interface I {
  cartItem: IResponseCars[];
}

interface II {
  cart: I;
}

const Saved = () => {
  const { data: dataCar } = useQuery<IResponse>({
    queryKey: ["allCar"],
    queryFn: allCarApi,
  });
  const cart: I = useSelector((state: II) => state.cart);
  const client = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: deleteCarApi,
  });

  const dates = dataCar?.data;

  const deleteCar = async (id: number) => {
    const filleter = dates?.filter((item) => item.id !== id);
    await mutateAsync(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["allCar"] });
      },
    });
  };

  return (
    <div className="home__cars-wrapper mb-2">
      {cart.cartItem.map((item) => {
        return <CarCard car={item} deleteCar={deleteCar} key={item.id} />;
      })}
    </div>
  );
};

export default Saved;
