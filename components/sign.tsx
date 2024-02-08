"use client";
import { IPayloadSignUp } from "@/types";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { createUserApi } from "../axios/user/create_user.api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "./input";
import Button from "./button";

export default function Sign() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const schema = z.object({
    email: z.string().email(),
    username: z.string(),
    number: z.number().min(2),
    password: z.string().min(2).max(20),
  });

  type Schema = z.infer<typeof schema>;

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const { mutateAsync, error, isError, isPending } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      router.push("/login");
      alert("hello");
    },
  });

  const onSubmit = async (element: Schema) => {
    const body: IPayloadSignUp = {
      email: element.email,
      number: element.number,
      password: element.password,
      username: element.username,
    };

    await mutateAsync(body);
  };
  return (
    <div className=" p-3 sm:p-5 w-full bg-black/70 dark:bg-white ">
      {isError && <h1>{error.message}</h1>}
      <h2
        data-cy="title"
        className="font-bold text-[17px] text-center  p-2 text-white dark:text-black"
      >
        Create a new account
      </h2>
      <form
        noValidate
        className="flex flex-col w-full mt-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <h1 className="error">{error.message}</h1>}
        <div className="flex flex-col   mt-2">
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

        <div className="flex flex-col  mt-2">
          <p className="text-[12px] sm:text-[15px] mt-1  text-red-400">
            {errors.username?.message}
          </p>

          <Input {...register("username")} label="UserName" type={"text"} />
        </div>
        <div className="flex flex-col  items-start mt-2">
          <p className="text-[12px] sm:text-[15px] mt-1  text-red-400">
            {errors.number?.message}
          </p>

          <Input
            {...register("number", { valueAsNumber: true })}
            label="Number"
            type={"number"}
          />
        </div>

        <Button isLoading={isPending} data_cy={"submit"}>
          Sign
        </Button>
        <Link
          data-cy="toLogin"
          className="font-bold underline text-white    dark:text-black"
          href={"/login"}
        >
          Do have account?
        </Link>
      </form>
    </div>
  );
}
