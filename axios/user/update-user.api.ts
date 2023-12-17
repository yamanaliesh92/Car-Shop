import { http } from "..";
import { ResponseCreateUser } from "./create_user.api";

export interface IPayloadUpdate {
  username?: string;
  number?: number;
}

export async function updateUserApi(dto: IPayloadUpdate): Promise<string> {
  return await http.patch("/auth", dto);
}
