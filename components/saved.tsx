"use client";

import { IResponseCars } from "@/axios/car/AllCar.api";
import React from "react";
import { useSelector } from "react-redux";
import { CarCard } from ".";

interface I {
  cartItem: IResponseCars[];
}

interface II {
  cart: I;
}

const Saved = () => {
  const cart: I = useSelector((state: II) => state.cart);

  return (
    <div className="home__cars-wrapper mb-2">
      {cart.cartItem.map((item) => {
        return <CarCard car={item} key={item.id} />;
      })}
    </div>
  );
};

export default Saved;
