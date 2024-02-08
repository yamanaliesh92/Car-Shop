"use client";

import { allCarApi, IResponse, IResponseCars } from "@/axios/car/AllCar.api";
import React from "react";
import { useSelector } from "react-redux";
import { CarCard } from ".";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCarApi } from "@/axios/car/deleteCar.api";
import { IRedux } from "@/redux/store";

interface I {
  cartItem: IResponseCars[];
}

const Saved = () => {
  const {
    data: dataCar,
    isPending,
    error,
  } = useQuery<IResponse>({
    queryKey: ["allCar"],
    queryFn: allCarApi,
  });
  const cart = useSelector((state: IRedux) => state.cart);
  const client = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: deleteCarApi,
  });

  const dates = dataCar?.data;

  const deleteCar = async (id: number) => {
    dates?.filter((item) => item.id !== id);
    await mutateAsync(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["allCar"] });
      },
    });
  };

  return (
    <>
      <div className="home__cars-wrapper mb-2">
        {error && <h1 className="error">{error.message}</h1>}
        {cart.cartItem.map((item) => {
          return <CarCard car={item} deleteCar={deleteCar} key={item.id} />;
        })}
      </div>
      {cart.cartItem.length === 0 && (
        <h1 className="text-center text-2xl text-red-400">
          you are didn't add any car to your favorite{" "}
        </h1>
      )}
    </>
  );
};

export default Saved;
