
"use client";

import { useEffect, useState } from "react";

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

export function useAuth() {
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

  async function iniciar(datos: DatosLogin) {
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

  return {
    usuario,
    cargando,
    autenticado: usuario !== null,
    iniciar,
    registrar,
    cerrar,
  };
}
