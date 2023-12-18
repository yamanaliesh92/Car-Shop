import { http } from "..";

export interface payloadUpdateImgCar {
  id: number;
  img: string;
}
export async function UpdateImgCarApi(
  payload: payloadUpdateImgCar
): Promise<string> {
  return await http.patch(`car/updateImg/${payload.id}`, payload.img);
}
