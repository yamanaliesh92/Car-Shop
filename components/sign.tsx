"use client";
import { IPayloadSignUp } from "@/types";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserApi } from "../axios/user/create_user.api";

const init: IPayloadSignUp = {
  number: 0,
  username: "",
  password: "",
  email: "",
};

export default function Sign() {
  const [element, setElement] = useState<IPayloadSignUp>(init);

  const router = useRouter();

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof IPayloadSignUp,
    isNumber: boolean
  ) => {
    const value = isNumber ? e.target.valueAsNumber : e.target.value;
    setElement((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const { mutateAsync, error, isSuccess } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      router.push("/login");
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: IPayloadSignUp = {
      email: element.email,
      number: element.number,
      password: element.password,
      username: element.username,
    };

    await mutateAsync(body);
  };
  return (
    <div className="w-[400px] h-[350px] overflow-hidden">
      <div className="w-full h-full  rounded-[20px]">
        <form className="p-4 items-center flex flex-col" onSubmit={onSubmit}>
          <h1
            data-testid="we"
            className="font-bold items-center"
            data-cy={"title"}
          >
            welcome in car store
          </h1>

          <div className="w-full mt-3">
            <input
              className="w-full p-6 h-[35px] border-none rounded-md outline-none"
              placeholder="enter your email"
              value={element.email}
              name="email"
              type={"email"}
              data-cy={"emailInput"}
              required
              onChange={(e) => onChange(e, "email", false)}
            />
          </div>
          <div className="w-full mt-3">
            <input
              className="w-full p-6 h-[35px] border-none rounded-md outline-none"
              placeholder="enter your email"
              value={element.password}
              name="password"
              data-cy={"passwordInput"}
              type={"password"}
              required
              onChange={(e) => onChange(e, "password", false)}
            />
          </div>
          <div className="w-full mt-3">
            <input
              className="w-full p-6 h-[35px] border-none rounded-md outline-none"
              placeholder="enter your username"
              value={element.username}
              name="username"
              data-cy={"usernameInput"}
              type={"text"}
              required
              onChange={(e) => onChange(e, "username", false)}
            />
          </div>
          <div className="w-full mt-3">
            <input
              className="w-full p-6 h-[35px] border-none rounded-md outline-none"
              placeholder="enter your phone number"
              value={element.number}
              required
              type={"number"}
              data-cy={"numberInput"}
              name="number"
              onChange={(e) => onChange(e, "number", true)}
            />
          </div>
          <div className="flex place-self-start justify-between items-center mt-4">
            <button
              data-cy="submit"
              className="w-fit  h-fit border-none rounded-md outline-none bg-gray-300  text-white p-4"
            >
              sign
            </button>
            <Link
              data-cy="toLogin"
              className="font-bold ml-4 sm:ml-9  text-black"
              href={"/login"}
            >
              Do have account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
