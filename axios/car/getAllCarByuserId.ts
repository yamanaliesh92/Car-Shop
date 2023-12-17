import { IPayloadAllCar } from "@/types";
import { http } from "..";
import { IResponse, IResponseCars } from "./AllCar.api";

export interface IResponseMyCar {
  data: {
    number: number;
    cars: IResponseCars[];
  };
}
export async function getByUserIdCarApi(): Promise<IResponseMyCar> {
  return await http.get(`car/allCarByUserId`);
}
