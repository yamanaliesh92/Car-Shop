"use client";
import { IPayloadLogin } from "@/types";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginUserApi } from "@/axios/user/login-user.api";
import { setCookie } from "@/utils/cookie";
const init: IPayloadLogin = {
  email: "",
  password: "",
};

export default function Login() {
  const [element, setElement] = useState<IPayloadLogin>(init);

  const router = useRouter();

  const { mutateAsync, error } = useMutation({
    mutationFn: LoginUserApi,
    onSuccess: () => {
      router.push("/");
      // setCookie("MyToken", data as string);
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: IPayloadLogin = {
      email: element.email,
      password: element.password,
    };
    const data = await mutateAsync(body);
    console.log("data", data);
    setCookie("MyToken", data.data.accessToken as string);
  };

  // console.log(data, "hetree");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setElement((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="p-1 sm:px-10 w-full">
      <h2 data-cy="title" className="font-bold text-2xl text-[#184191]">
        Login
      </h2>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <input
          className="p-2 mt-8 rounded-xl border w-[130px] sm:w-full"
          placeholder="enter your email"
          value={element.email}
          data-cy={"emailInput"}
          name="email"
          type={"email"}
          required
          onChange={onChange}
        />

        <div className="relative mt-4">
          <input
            className="sm:w-full p-2  border rounded-xl w-[130px]"
            placeholder="enter your password"
            value={element.password}
            name="password"
            data-cy={"passwordInput"}
            type={"password"}
            required
            onChange={onChange}
          />
        </div>

        <button
          data-cy={"submit"}
          className="mt-4 border-none rounded-xl bg-[#184191] text-white p-2 sm:p-4  w-[130px] sm:w-full"
        >
          sign
        </button>
      </form>
      <div className="grid grid-cols-3 items-center text-gray-500 mt-2">
        <hr className="border-gray-500" />
        <p data-cy={"or"} className="text-center text-sm">
          OR
        </p>
        <hr className="border-gray-500" />
      </div>
      <div className="flex flex-col">
        <Link
          className="mt-5 d text-[15px] sm:text-sm border-b w-fit border-gray-400 sm:py-2 "
          href={"/sign"}
          data-cy={"create-account"}
        >
          Create a new account
        </Link>

        <Link
          className="mt-2  text-[15px] text-red-500 sm:text-sm  sm:py-2 "
          href={"/changepassword"}
        >
          forget the password
        </Link>
      </div>
    </div>
  );
}
// important and completed is boolean and name=important.tostring() type="date e.target.chckerd/date:E.tragetr.vaklue

// title decriaotoion date completed important
// "