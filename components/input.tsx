import React, { FocusEventHandler } from "react";
import { ChangeHandler } from "react-hook-form";

interface IInputProps {
  label: string;
  value?: string | number;
  name?: string;
  type: string;
  htmlFor?: string;
  data_cy?: string;
  id?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;

  onChange?: ChangeHandler;
}

function MyInput(
  { label, name, data_cy, onChange, type, onBlur }: IInputProps,
  ref: any
) {
  return (
    <>
      <label className="text-white dark:text-black text-[14px]" htmlFor={name}>
        {label}
      </label>
      <input
        data-cy={data_cy}
        id={name}
        name={name}
        onChange={onChange}
        type={type || "number" || "password" || "file"}
        onBlur={onBlur}
        ref={ref}
        className="p-2 mt-1 h-[35px] rounded-xl border w-[130px] sm:w-full bg-white text-black dark:bg-white dark:text-black  outline-0 text-sm  border-white dark:border-black   placeholder:text-black focus:dark:border-green-400 focus:border-red-900  "
      />
    </>
  );
}

const Input = React.forwardRef(MyInput);

export default Input;
