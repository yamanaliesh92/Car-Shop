"use client";
import ClipLoader from "react-spinners/ClipLoader";
import { FC, PropsWithChildren } from "react";

const Button: FC<
  PropsWithChildren<{
    isLoading?: boolean;
    data_cy?: string;
    width?: number;
    onClick?: () => void;
  }>
> = ({ children, onClick, width, data_cy, isLoading }) => {
  console.log("ddddddddd", { width });
  return (
    <button
      data-cy={data_cy}
      onClick={onClick}
      className={`sm:w-[${
        width ? width : 60
      }px] md:w-[100px] bg-primary text-white p-2  flex items-center justify-center    my-3 rounded-[12px] cursor-pointer`}
    >
      {!isLoading ? (
        children
      ) : (
        <ClipLoader
          color={"gray"}
          loading={isLoading}
          size={18}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </button>
  );
};

export default Button;
