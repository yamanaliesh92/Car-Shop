import { http } from "..";

interface IPayloadLogin {
  password: string;
  email: string;
}

export async function LoginUserApi(payload: IPayloadLogin) {
  return await http.post("/auth", payload);
}
