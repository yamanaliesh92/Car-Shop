import { http } from "..";

export async function deleteCarApi(id: number): Promise<string> {
  return await http.delete(`car/${id}`);
}
