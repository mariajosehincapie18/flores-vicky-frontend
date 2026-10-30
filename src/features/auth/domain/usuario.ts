
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  role: string;
}

export interface DatosRegistro {
  nombre: string;
  email: string;
  password: string;
}

export interface DatosLogin {
  email: string;
  password: string;
}

export interface RespuestaLogin {
  token: string;
  usuario: Usuario;
}

export interface RespuestaRegistro {
  mensaje: string;
  usuario: Usuario;
}
