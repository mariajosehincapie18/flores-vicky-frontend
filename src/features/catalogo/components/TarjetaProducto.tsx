
import type { Producto } from "../domain/producto";

interface TarjetaProductoProps {
  producto: Producto;
}

export default function TarjetaProducto({
  producto,
}: TarjetaProductoProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-pink-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-56 items-center justify-center bg-pink-50">
        {producto.imagen ? (
          <img
            src={
              producto.imagen.startsWith("http")
                ? producto.imagen
                : `/imagenes/${producto.imagen.split("/").pop()}`
            }
            alt={producto.nombre}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm text-gray-500">
            Imagen no disponible
          </span>
        )}
      </div>

      <div className="space-y-3 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-pink-600">
          {producto.categoria}
        </p>

        <h2 className="text-lg font-semibold text-gray-800">
          {producto.nombre}
        </h2>

        {producto.descripcion && (
          <p className="text-sm leading-6 text-gray-600">
            {producto.descripcion}
          </p>
        )}

        {producto.caracteristicas && (
          <p className="text-sm text-gray-500">
            {Array.isArray(producto.caracteristicas)
              ? producto.caracteristicas.join(" · ")
              : producto.caracteristicas}
          </p>
        )}
      </div>
    </article>
  );
}
