import { http } from "..";
import { ResponseCreateUser } from "./create_user.api";

export interface ResponseUser {
  data: ResponseCreateUser[];
}

export async function getAllUserApi(): Promise<ResponseUser> {
  return await http.get("/auth/all");
}
