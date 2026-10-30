
import { http } from "../../common/http";
import type { Producto } from "../domain/producto";

export interface DatosProducto {
  nombre: string;
  categoria: string;
  imagen: string;
  descripcion: string;
  caracteristicas: string;
}

export async function obtenerProductos(): Promise<Producto[]> {
  return http<Producto[]>("/api/productos");
}

export async function obtenerProductoPorId(id: number): Promise<Producto> {
  return http<Producto>(`/api/productos/${id}`);
}

export async function crearProducto(
  datos: DatosProducto,
  token: string
) {
  return http("/api/productos", {
    method: "POST",
    token,
    body: JSON.stringify(datos),
  });
}

export async function actualizarProducto(
  id: number,
  datos: DatosProducto,
  token: string
) {
  return http(`/api/productos/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(datos),
  });
}

export async function eliminarProducto(
  id: number,
  token: string
) {
  return http(`/api/productos/${id}`, {
    method: "DELETE",
    token,
  });
}
