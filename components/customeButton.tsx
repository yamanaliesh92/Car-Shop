"use client";
import { ICustomButtonProps } from "@/types";
import Image from "next/image";
import React, { FC } from "react";

const CustomButton: FC<ICustomButtonProps> = ({
  containerStyle,
  title,
  rightIcon,
  textStyles,
  btnType,
  handleClick,
}) => {
  return (
    <button
      disabled={false}
      className={`custom-btn ${containerStyle}`}
      type={btnType || "button"}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="w-4 h-4 relative">
          <Image
            src={rightIcon}
            alt="right-icon"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
