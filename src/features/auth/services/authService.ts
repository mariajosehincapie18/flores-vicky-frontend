
import { http } from "../../common/http";

import type {
  DatosLogin,
  DatosRegistro,
  RespuestaLogin,
  RespuestaRegistro,
} from "../domain/usuario";

export async function registrar(datos: DatosRegistro) {
  return http<RespuestaRegistro>("/api/auth/registro", {
    method: "POST",
    body: JSON.stringify(datos),
  });
}

export async function iniciarSesion(datos: DatosLogin) {
  return http<RespuestaLogin>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(datos),
  });
}
