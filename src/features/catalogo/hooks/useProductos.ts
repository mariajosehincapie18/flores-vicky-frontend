
"use client";

import { useCallback, useEffect, useState } from "react";
import { obtenerProductos } from "../services/productoService";
import type { Producto } from "../domain/producto";

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarProductos = useCallback(async () => {
    setCargando(true);
    setError(null);

    try {
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible cargar los productos."
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargarProductos();
  }, [cargarProductos]);

  return {
    productos,
    cargando,
    error,
    recargar: cargarProductos,
  };
}
