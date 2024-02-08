"use client";

import { IResponseCars } from "@/axios/car/AllCar.api";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export interface ICart {
  cartItem: IResponseCars[];
}

const ls = typeof window !== "undefined" ? window.localStorage : null;

const cartFromLocalStorage: IResponseCars[] = ls?.getItem("cartItem")
  ? JSON.parse(ls?.getItem("cartItem")!)
  : [];

const init: ICart = {
  cartItem: cartFromLocalStorage,
};

const cart = createSlice({
  name: "cart",
  initialState: init,
  reducers: {
    addToCart: (state, action: PayloadAction<IResponseCars>) => {
      const newItem = action.payload;
      const existItem = state.cartItem.find((item) => item.id === newItem.id);
      // console.log("newItem", newItem);
      // console.log("exis", existItem);
      if (existItem) {
        toast("already is exist");
      } else {
        state.cartItem.push(newItem);
      }

      ls?.setItem("cartItem", JSON.stringify(state.cartItem));

      // return {
      //   ...state,
      //   cartItem: [...state.cartItem, newItem],
      // };
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const id = action.payload.id;
      const updateState = state.cartItem.filter((item) => item.id !== id);
      state.cartItem.splice(0, state.cartItem.length, ...updateState);

      ls?.setItem("cartItem", JSON.stringify(state.cartItem));
    },
  },
});
export default cart.reducer;

export const { addToCart, removeFromCart } = cart.actions;
