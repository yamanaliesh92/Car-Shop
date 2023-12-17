"use client";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "./customeButton";
import { useState } from "react";
import { BsCartFill } from "react-icons/bs";
import { MdSpaceDashboard, MdCreate, MdDarkMode } from "react-icons/md";

import Cart from "./cart";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/redux/theme";

import { BsFillSunFill } from "react-icons/bs";

import { GiHamburgerMenu } from "react-icons/gi";
import { BsXLg } from "react-icons/bs";
import dynamic from "next/dynamic";

const CreateCategory = dynamic(() => import("./createCategory"), {
  ssr: false,
  loading: () => <h1>lodainge</h1>,
});

const NavBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openCreateCar, setOpenCreateCar] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [openBurger, setOpenBurger] = useState(false);

  const mode = useSelector((state: any) => state.theme.mode);
  2;

  const cart = useSelector((state: any) => state.cart.cartItem);

  {
    mode === true
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }

  const changeOpe = () => {
    setOpenBurger(false);
    setOpen((prev) => !prev);
  };

  const changeOpenBurger = () => {
    setOpenBurger((prev) => !prev);
  };

  const changeOpenCreateCar = () => {
    setOpenBurger(false);
    setOpenCreateCar((prev) => !prev);
  };
  console.log("theme", mode);
  return (
    <header className="w-full z-10 sticky h-[75px]">
      <nav
        className="max-w-[1440px]
          w-full  mx-auto flex justify-between items-center sm:px-16 px-6 py-4 light:bg-transparent dark:text-white/80 dark:bg-black"
      >
        <div className=" w-full sm:w-fit flex  justify-between items-center">
          <Link href="/" className="flex justify-center items-end">
            <Image
              src="/logo.svg"
              alt="logo"
              width={118}
              height={18}
              className="object-contain dark:text-white"
            />
          </Link>

          {openBurger ? (
            <BsXLg
              onClick={changeOpenBurger}
              size={25}
              className="flex sm:hidden cursor-pointer"
            />
          ) : (
            <GiHamburgerMenu
              onClick={changeOpenBurger}
              size={25}
              className="flex sm:hidden cursor-pointer"
            />
          )}
        </div>

        <div className="hidden  sm:flex items-center gap-4 relative">
          <Link href={"/sign"}>
            <CustomButton
              title="Sign in"
              btnType="button"
              containerStyle="text-primary-blue rounded-full bg-white min-w-[130px]"
            />
          </Link>

          <BsCartFill
            size={20}
            data-cy="cart"
            cursor={"pointer"}
            onClick={changeOpe}
          />
          <div className="w-[15px] flex items-center justify-center absolute right-[6.25] top-[-0.25] p-3 h-[15px] rounded-full bg-red-500">
            {cart.length}
          </div>

          <Link href={"/dashboard"} data-cy="dashboardButton">
            <MdSpaceDashboard
              title="your dashboard"
              cursor={"pointer"}
              size={20}
            />
          </Link>
          <MdCreate
            size={20}
            cursor={"pointer"}
            data-cy={"createButton"}
            onClick={changeOpenCreateCar}
            title="createCar"
          />
          <button onClick={() => dispatch(toggle())}>
            {mode ? (
              <BsFillSunFill cursor={"pointer"} size={20} />
            ) : (
              <MdDarkMode cursor={"pointer"} size={20} />
            )}
          </button>
        </div>
      </nav>
      {openBurger ? (
        <div className="w-full h-screen duration-300 transition-all border-t-2 border-t-primary-blue-100 ease-in-out z-30 top-0 right-0 light:bg-transparent dark:text-white/80 dark:bg-black flex  justify-center">
          <div className="fe flex mt-5 p-3 flex-col items-center gap-4">
            <div className="re relative">
              <BsCartFill
                size={20}
                data-cy="cart"
                cursor={"pointer"}
                onClick={changeOpe}
              />
              <div className="w-[20px] h-[20px] rounded-full bg-red-500"></div>
            </div>
            <Link href={"/dashboard"} data-cy="dashboardButton">
              <MdSpaceDashboard
                onClick={() => setOpenBurger(false)}
                title="your dashboard"
                cursor={"pointer"}
                size={20}
              />
            </Link>
            <MdCreate
              size={20}
              cursor={"pointer"}
              data-cy={"createButton"}
              onClick={changeOpenCreateCar}
              title="createCar"
            />
            <button onClick={() => dispatch(toggle())}>
              {mode ? (
                <BsFillSunFill cursor={"pointer"} size={20} />
              ) : (
                <MdDarkMode cursor={"pointer"} size={20} />
              )}
            </button>
          </div>
        </div>
      ) : null}
      {open ? (
        <div className="fixed top-0 right-0 z-50 transition-all duration-300 w-[350px] h-full">
          <Cart setOpen={setOpen} />
        </div>
      ) : null}

      {openCreateCar && (
        <div className="w-full fixed h-[70%] flex items-center justify-center top-1 p-[6px]">
          <CreateCategory closeModal={setOpenCreateCar} />
        </div>
      )}
    </header>
  );
};

export default NavBar;
