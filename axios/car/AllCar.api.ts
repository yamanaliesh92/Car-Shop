import { http } from "..";
export interface IResponseCars {
  price: number;
  img: string;
  sell: string;
  cylinders: number;
  id: number;
  userId: number;
  make: string;
  category: string;
  name: string;
  year: number;
  type: string;
  carColor: string;
  transmission: string;
}

export interface IResponse {
  data: IResponseCars[];
}

export async function allCarApi(): Promise<IResponse> {
  return await http.get("/car/all/allCars");
}
