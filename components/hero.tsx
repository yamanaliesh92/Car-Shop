"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import CustomButton from "./customeButton";

const Hero = () => {
  // const handleScroll = () => {
  //   const nextSection = document.getElementById("discover");

  //   if (nextSection) {
  //     nextSection.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  const mode = useSelector((state: any) => state.theme.mode);

  useEffect(() => {
    {
      mode === true
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="hero dark:bg-black dark:text-white">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">Rent a car—quick!</h1>

        <p className="hero__subtitle dark:text-white mb-7">
          Streamline your car rental experience with our effortless booking
          process.
        </p>

        <Link
          className="sm:w-[60px] md:w-[100px] text-[14px] bg-primary text-white p-2  flex items-center justify-center    my-3 rounded-[12px] cursor-pointer"
          href="#product"
        >
          Explore Cars
        </Link>

        {/* <CustomButton
          title="Explore Cars"
          containerStyle="bg-primary-blue text-white rounded-full mt-10 dark:bg-white dark:text-blue-500"
          handleClick={handleScroll}
        /> */}
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image
            src="/hero.png"
            alt="hero"
            fill
            // placeholder="blur"
            className="object-contain"
          />
        </div>

        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
