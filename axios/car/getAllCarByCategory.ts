import { IPayloadAllCar } from "@/types";
import { http } from "..";
import { IResponse } from "./AllCar.api";

export async function getByCategoryCarApi(
  category: string
): Promise<IResponse> {
  return await http.get(`car/byCategory?category=${category}`);
}
