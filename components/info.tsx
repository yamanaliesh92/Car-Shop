"use client";
import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { meApi } from "@/axios/user/Me.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResponseCreateUser } from "@/axios/user/create_user.api";
import { IPayloadUpdate, updateUserApi } from "@/axios/user/update-user.api";
import { toast } from "react-hot-toast";

export default function Info() {
  const [openEdit, setOpenEdit] = useState(false);

  const { data: dateMe } = useQuery<ResponseCreateUser>({
    queryKey: ["me"],
    queryFn: meApi,
  });
  const client = useQueryClient();
  const { mutateAsync } = useMutation({ mutationFn: updateUserApi });

  const updateForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: IPayloadUpdate = {
      number: dateMe?.number,
      username: dateMe?.username,
    };
    await mutateAsync(body, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["me"] });
        toast.success("update is done");
        setOpenEdit(false);
      },
    });
  };
  return (
    <form
      onSubmit={updateForm}
      className=" w-fit ml-2 sm:ml-0 sm:w-[200px] h-fit md:w-[250px] md:h-[250px] overflow-y-hidden flex items-start rounded-t-lg rounded-sm bg-secondary-orange shadow-md flex-col sm:p-2"
    >
      <div className="w-full mt-2 flex items-center p-1 md:p-3">
        {openEdit ? (
          <input
            className="w-[90%] rounded-sm outline-none border-none    bg-gray-600 "
            value={dateMe?.username}
            data-cy="usernameInput"
          />
        ) : (
          <div className="flex items-center justify-between">
            <h1 data-cy="usernameTitle">username:</h1>
            <h2 data-cy="usernameData" className="font-bold sm:ml-1 md:ml-3 ">
              {dateMe?.username}
            </h2>
          </div>
        )}
      </div>

      <div className="w-full mt-2 flex items-center p-1 md:p-3">
        {openEdit ? (
          <input
            className="w-[90%] outline-none border-none   rounded-sm bg-gray-600 "
            value={dateMe?.number}
            type={"number"}
            data-cy="numberInput"
          />
        ) : (
          <div className="flex items-center justify-between">
            <h1 data-cy="numberTitle">the number:</h1>
            <h2 data-cy="numberData" className="font-bold ml-1 md:ml-3">
              {dateMe?.number}
            </h2>
          </div>
        )}
      </div>

      {openEdit ? (
        <div className="flex w-[90%]  p-1 md:p-3 sm:justify-between sm:items-center">
          <button
            data-cy="updateButtonCancel"
            onClick={() => setOpenEdit(!openEdit)}
            className="mt-2 p-[2px]  mb-1 sm:mb-0 mr-1 sm:p-2 rounded-md bg-blue-400 w-fit h-fit "
          >
            cancel
          </button>
          <button
            data-cy="updateButtonDone"
            className="mt-2 p-[2px]  mb-1 sm:mb-0 sm:p-2 rounded-md bg-blue-400 w-fit h-fit "
          >
            done
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpenEdit(!openEdit)}
          data-cy="updateButton"
          className="mt-2 p-[2px] mb-1 sm:mb-0 sm:p-2 rounded-md bg-blue-400 w-fit h-fit self-center"
        >
          update
        </button>
      )}
    </form>
  );
}
