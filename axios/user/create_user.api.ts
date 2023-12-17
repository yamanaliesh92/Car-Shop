import { http } from "..";

interface IPayloadCreateUser {
  username: string;
  password: string;
  email: string;
  number: number;
}

export interface ResponseCreateUser {
  username: string;
  password: string;
  email: string;
  number: number;
  id: number;
}

export async function createUserApi(
  payload: IPayloadCreateUser
): Promise<ResponseCreateUser> {
  return await http.post("/auth/create", payload);
}
