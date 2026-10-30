
import type { Usuario } from "../domain/usuario";

const TOKEN_KEY = "vicky_token";
const USER_KEY = "vicky_usuario";

export function guardarSesion(token: string, usuario: Usuario) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(usuario));
}

export function obtenerToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function obtenerUsuario(): Usuario | null {
  const usuario = localStorage.getItem(USER_KEY);

  if (!usuario) return null;

  try {
    return JSON.parse(usuario) as Usuario;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function cerrarSesionStorage() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
