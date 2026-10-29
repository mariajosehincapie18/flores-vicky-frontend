
"use client";

import { useProductos } from "../hooks/useProductos";
import TarjetaProducto from "./TarjetaProducto";

export default function CatalogoProductos() {
  const { productos, cargando, error, recargar } = useProductos();

  if (cargando) {
    return (
      <p className="py-12 text-center text-gray-600">
        Cargando nuestros productos...
      </p>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-red-600">{error}</p>
        <button
          onClick={recargar}
          className="rounded-lg bg-pink-600 px-5 py-2 text-white hover:bg-pink-700"
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <p className="py-12 text-center text-gray-600">
        Todavía no tenemos productos disponibles.
      </p>
    );
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Nuestros productos
        </h2>

        <span className="text-sm text-gray-500">
          {productos.length} productos
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productos.map((producto) => (
          <TarjetaProducto
            key={producto.id}
            producto={producto}
          />
        ))}
      </div>
    </section>
  );
}
