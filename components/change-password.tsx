"use client";
import { IPayloadLogin } from "@/types";
import Link from "next/link";

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Button from "./button";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const schema = z
    .object({
      email: z.string().email(),
      confirmPassword: z.string().min(2).max(20),
      password: z.string().min(2).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "password don't match",
      path: ["confirmPassword"],
    });
  type Schema = z.infer<typeof schema>;

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  // const { mutateAsync, error, data } = useMutation({
  //   mutationFn: LoginUserApi,
  //   onSuccess: () => {
  //     router.push("/login");
  //     // setCookie("MyToken", data?.token as string);
  //   },
  // });

  const onSubmit = async (element: Schema) => {
    const body: IPayloadLogin = {
      email: element.email,
      password: element.password,
    };

    // await mutateAsync(body);
    // console.log(data, "dddddddddddddddddd");
  };

  return (
    <div className="p-3 h-fit  sm:p-5 w-full bg-black/70 dark:bg-white">
      <h2
        data-cy="title"
        className="font-bold text-[17px] text-center my-4 p-2 text-white dark:text-black"
      >
        change_password
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <p className="text-[12px] sm:text-[15px] mt-1   text-red-400">
            {errors.email?.message}
          </p>

          <Input
            {...register("email")}
            data_cy={"emailInput"}
            label="Email"
            type="email"
          />
        </div>

        <div className="w-full flex flex-col  mt-2 relative">
          <p className="text-[12px] sm:text-[15px] mt-1  text-red-400">
            {errors.password?.message}
          </p>

          <Input
            {...register("password")}
            label="Password"
            type={showPassword ? "text" : "password"}
          />

          {showPassword ? (
            <AiOutlineEye
              size={22}
              className="absolute  dark:text-black right-[1.8rem] top-[34px]   sm:right-2 sm:top-[35px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          ) : (
            <AiOutlineEyeInvisible
              size={22}
              className="absolute dark:text-black right-[1.8rem] top-[34px] sm:right-2 sm:top-[35px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          )}
        </div>

        <div className="relative mt-4 flex flex-col">
          <Input
            {...register("confirmPassword")}
            label="ConfirmPassword"
            type={"text"}
          />
        </div>

        <Button data_cy={"submit"}>Rest</Button>

        <Link
          className="text-red-500  underline font-bold m w-fit p-3 "
          href={"/login"}
        >
          back to login
        </Link>
      </form>
    </div>
  );
}
