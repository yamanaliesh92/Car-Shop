import { IPayloadAllCar } from "@/types";
import { http } from "..";

export async function createCarApi(payload: IPayloadAllCar) {
  return await http.post("/car", payload);
}
