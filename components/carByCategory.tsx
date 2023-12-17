"use client";
import React from "react";

import { useQuery } from "@tanstack/react-query";
import { IResponse } from "@/axios/car/AllCar.api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import CarCard from "./carCard";
import { deleteCarApi } from "@/axios/car/deleteCar.api";
import { getByCategoryCarApi } from "@/axios/car/getAllCarByCategory";
import Link from "next/link";

interface PageProps {
  category: string;
}

export default function CarByCategory({ category }: PageProps) {
  const client = useQueryClient();
  const { data } = useQuery<IResponse>({
    queryKey: ["carByCategory"],
    queryFn: () => getByCategoryCarApi(category),
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteCarApi,
  });

  const deleteCar = async (id: number) => {
    const filleter = data?.data?.filter((item) => item.id !== id);
    await mutateAsync(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["allCar"] });
      },
    });
  };

  return (
    <div>
      <div className="flex mt-6  ml-10">
        <Link
          href={"/"}
          className="w-fit h-fit  p-3 rounded-lg bg-blue-300 cursor-pointer"
        >
          To Home
        </Link>
      </div>
      <div className="home__cars-wrapper">
        {data?.data?.map((item) => {
          return <CarCard car={item} key={item.id} deleteCar={deleteCar} />;
        })}
      </div>
    </div>
  );
}
