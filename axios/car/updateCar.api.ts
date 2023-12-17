import { http } from "..";

export interface IUpdateCar {
  price?: number;
  sell?: string;
  cylinders?: number;
  make?: string;
  category?: string;
  name?: string;
  year?: number;
  type?: string;
  carColor?: string;
  transmission?: string;
}
export interface payloadUpdateCar {
  id: number;
  payload: IUpdateCar;
}
export async function UpdateCarApi(payload: payloadUpdateCar): Promise<string> {
  return await http.patch(`car/${payload.id}`, payload.payload);
}
