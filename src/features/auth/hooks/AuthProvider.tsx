"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  Usuario,
  DatosLogin,
  DatosRegistro,
} from "../domain/usuario";

import {
  iniciarSesion as iniciarSesionService,
  registrar as registrarService,
} from "../services/authService";

import {
  guardarSesion,
  obtenerToken,
  obtenerUsuario,
  cerrarSesionStorage,
} from "../services/authStorage";

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  autenticado: boolean;
  iniciar: (datos: DatosLogin) => Promise<Usuario>;
  registrar: (datos: DatosRegistro) => Promise<unknown>;
  cerrar: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = obtenerToken();
    const usuarioGuardado = obtenerUsuario();

    if (token && usuarioGuardado) {
      setUsuario(usuarioGuardado);
    } else {
      cerrarSesionStorage();
    }

    setCargando(false);
  }, []);

  async function iniciar(datos: DatosLogin): Promise<Usuario> {
    const respuesta = await iniciarSesionService(datos);

    guardarSesion(respuesta.token, respuesta.usuario);
    setUsuario(respuesta.usuario);

    return respuesta.usuario;
  }

  async function registrar(datos: DatosRegistro) {
    return registrarService(datos);
  }

  function cerrar() {
    cerrarSesionStorage();
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        autenticado: usuario !== null,
        iniciar,
        registrar,
        cerrar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
}