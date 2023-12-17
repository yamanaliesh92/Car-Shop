"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const scrollToTops = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  console.log("eddd", window.scroll);

  return (
    <div className="fixed z-10 right-3 top-[6.6rem]">
      {visible && (
        <div
          onClick={scrollToTops}
          className=" bg-red-600 rounded-md flex items-center justify-center w-[50px] h-[50px]"
        >
          <AiOutlineArrowUp size={25} />
        </div>
      )}
    </div>
  );
}
