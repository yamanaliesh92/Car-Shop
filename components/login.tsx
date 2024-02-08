"use client";
import { IPayloadLogin } from "@/types";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoginUserApi } from "@/axios/user/login-user.api";
import { setCookie } from "@/utils/cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./input";
import Button from "./button";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const schema = z.object({
    email: z.string().email(),

    password: z.string().min(2).max(20),
  });

  type Schema = z.infer<typeof schema>;

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const { mutateAsync, isError, error, data, isPending } = useMutation({
    mutationFn: LoginUserApi,
    onSuccess: () => {
      router.push("/");
    },
  });
  console.log("dataF", data);
  const onSubmit = async (element: Schema) => {
    const body: IPayloadLogin = {
      email: element.email,
      password: element.password,
    };
    const data = await mutateAsync(body);
    console.log("data", data);
    setCookie("MyToken", data?.data?.accessToken as string);
    setCookie("MyRefreshToken", data?.data?.refreshToken as string);
  };

  return (
    <div className="p-3  sm:p-5 w-full bg-black/70 dark:bg-white ">
      <div className="flex justify-between items-center">
        <h2
          data-cy="title"
          className="font-bold text-[17px] text-center  text-white dark:text-black"
        >
          Login
        </h2>
        <Link
          className="font-bold text-[17px] text-center  text-white dark:text-black"
          href={"/"}
        >
          X
        </Link>
      </div>
      <button onClick={async () => await signIn("google")}>Google</button>
      <form
        noValidate
        className="flex flex-col mt-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isError && <h1 className="error">{error.message}</h1>}
        <div className="flex flex-col  items-start mt-2">
          <p className="error">{errors.email?.message}</p>

          <Input {...register("email")} label="Email" type="email" />
        </div>

        <div className="w-full flex flex-col  mt-2 relative">
          <p className="error">{errors.password?.message}</p>

          <Input
            {...register("password")}
            label="Password"
            type={showPassword ? "text" : "password"}
          />

          {showPassword ? (
            <AiOutlineEye
              size={22}
              className="absolute  dark:text-black right-[0.8rem] top-[34px]   sm:right-2 sm:top-[35px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          ) : (
            <AiOutlineEyeInvisible
              size={22}
              className="absolute dark:text-black right-[0.8rem] top-[34px] sm:right-2 sm:top-[35px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          )}
        </div>

        <Button isLoading={isPending} data_cy={"submit"}>
          Login
        </Button>
      </form>
      <div className="grid grid-cols-3 items-center text-gray-500 ">
        <hr className="dark:border-gray-500 border-gray-100" />
        <p
          data-cy={"or"}
          className="text-center text-white dark:text-primary  text-sm"
        >
          OR
        </p>
        <hr className="dark:border-gray-500 border-gray-100" />
      </div>
      <div className="flex flex-col">
        <Link
          className="mt-3 bg-secondry   flex items-center justify-center rounded-[12px]  dark:text-white  text-black-100 text-[15px] sm:text-sm border-b  w-[100px] border-gray-400 sm:p-2 "
          href={"/sign"}
          data-cy={"create-account"}
        >
          Sign Up
        </Link>

        <Link
          className="mt-2  underline text-[15px] text-red-500 sm:text-sm  sm:py-2 "
          href={"/changepassword"}
        >
          forget the password
        </Link>
      </div>
    </div>
  );
}
