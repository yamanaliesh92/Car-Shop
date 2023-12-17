import { http } from "..";
import { ResponseCreateUser } from "./create_user.api";

export interface ResponseUser {
  dataUser: ResponseCreateUser[];
}

export async function getAllUserApi(): Promise<ResponseUser> {
  return await http.get("/auth/all");
}
