
import { http } from "../../common/http";
import type { Producto } from "../domain/producto";

export async function obtenerProductos(): Promise<Producto[]> {
  const respuesta = await http<Producto[]>("/api/productos");

  return respuesta;
}

export async function obtenerProductoPorId(
  id: number
): Promise<Producto> {
  return http<Producto>(`/api/productos/${id}`);
}
