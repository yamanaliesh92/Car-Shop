"use client";

import { TiDelete } from "react-icons/ti";
import { Transition } from "@tailwindui/react";
import { Dispatch, FC, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import { IResponseCars } from "@/axios/car/AllCar.api";
import { removeFromCart } from "@/redux/cart";
import { IRedux } from "@/redux/store";

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const Cart: FC<IProps> = ({ setOpen, open }) => {
  const dispatch = useDispatch();

  const removeCart = (id: number) => {
    dispatch(removeFromCart({ id: id }));
    toast("remove cart is done");
  };
  const cart = useSelector((state: IRedux) => state.cart);

  return (
    <div
      // id="pro"
      className=" relative transition-all duration-900  bg-red-900   w-[100%] h-[100%] flex flex-col p-4 z-50"
    >
      <div className="flex justify-between border-b p-4">
        <h1 className="font-bold text-gray-600"> welcome in your favorite </h1>
        <h1 onClick={() => setOpen(false)}>X</h1>
      </div>

      {cart.cartItem.map((item) => (
        <div className="flex items-center justify-between p-2 border-b-2 border-b-red-400">
          <h2>{item.category}</h2>
          <h2>{item.id}</h2>
          <h2>{item.make}</h2>
          <h2>{item.make}</h2>
          <img
            src={item.img}
            alt="hello"
            className="w-[60px] h-[60px] rounded-full"
          />
          <TiDelete
            title="remove cart"
            size={30}
            onClick={() => removeCart(item.id)}
          />
        </div>
      ))}

      {cart.cartItem.length === 0 && (
        <h1 className="text-red-400 font-bold flex  items-center mt-28">
          no car in your cart
        </h1>
      )}
    </div>
  );
};

export default Cart;
