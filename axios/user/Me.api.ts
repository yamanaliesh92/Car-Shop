import { http } from "..";
import { ResponseCreateUser } from "./create_user.api";

export async function meApi(): Promise<ResponseCreateUser> {
  return await http.get("/auth");
}
