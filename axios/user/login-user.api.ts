import { http } from "..";

interface IPayloadLogin {
  password: string;
  email: string;
}

interface IResponseLogin {
  accessToken: string;
  refreshToken: string;
}

export async function LoginUserApi(payload: IPayloadLogin) {
  return await http.post("/auth", payload);
}
