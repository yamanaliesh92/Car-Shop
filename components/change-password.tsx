"use client";
import { IPayloadLogin } from "@/types";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
const init: IPayloadLogin = {
  email: "",
  password: "",
};

export default function ChangePassword() {
  const [element, setElement] = useState<IPayloadLogin>(init);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

  const router = useRouter();

  //   const { mutateAsync, error, data } = useMutation({
  //     mutationFn: LoginUserApi,
  //     onSuccess: () => {
  //       router.push("/");
  //       setCookie("MyToken", data?.token as string);
  //     },
  //   });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: IPayloadLogin = {
      email: element.email,
      password: element.password,
    };

    if (body.password !== confirmPassword) {
      setErrorConfirmPassword(true);
      setInterval(() => {
        setErrorConfirmPassword(false);
      }, 2000);
    }

    // await mutateAsync(body);
    // console.log(data, "dddddddddddddddddd");
  };

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
        change_password
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
            placeholder="enter a new  password"
            value={element.password}
            name="password"
            data-cy={"passwordInput"}
            type={"password"}
            required
            onChange={onChange}
          />
        </div>

        <div className="relative mt-4">
          <input
            className="sm:w-full p-2  border rounded-xl w-[130px]"
            placeholder="enter a new password again"
            value={confirmPassword}
            name="confirmPassword"
            data-cy={"confirmPasswordInput"}
            type={"password"}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {errorConfirmPassword && (
          <span className="text-red-500 font-bold">
            confirmPassword is not equal password try again....
          </span>
        )}

        <button
          data-cy={"submit"}
          className="mt-4 border-none rounded-xl bg-[#184191] text-white p-2 sm:p-4  w-[130px] sm:w-full"
        >
          submit
        </button>

        <Link
          className="text-blue-600 font-bold mt-2 w-fit p-3 border-b-2 border-b-blue-200"
          href={"/login"}
        >
          back to login
        </Link>
      </form>
    </div>
  );
}
// important and completed is boolean and name=important.tostring() type="date e.target.chckerd/date:E.tragetr.vaklue

// title decriaotoion date completed important
// "
