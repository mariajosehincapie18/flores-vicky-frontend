
import type { Producto } from "../domain/producto";

interface TarjetaProductoProps {
  producto: Producto;
}

export default function TarjetaProducto({
  producto,
}: TarjetaProductoProps) {
  const imagen = producto.imagen
    ? producto.imagen.startsWith("http")
      ? producto.imagen
      : `/imagenes/${producto.imagen.split("/").pop()}`
    : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#f0dce4] bg-white shadow-[0_4px_20px_rgba(110,52,76,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e7bfd0] hover:shadow-[0_14px_35px_rgba(110,52,76,0.12)]">
      <div className="relative h-64 overflow-hidden bg-[#fff1f5]">
        {imagen ? (
          <img
            src={imagen}
            alt={producto.nombre}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#987987]">
            Imagen próximamente
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#a5446b]">
          {producto.categoria}
        </p>

        <h2 className="mb-3 text-lg font-semibold leading-snug text-[#592e43]">
          {producto.nombre}
        </h2>

        {producto.descripcion && (
          <p className="text-sm leading-7 text-[#795f6b]">
            {producto.descripcion}
          </p>
        )}

        {producto.caracteristicas && (
          <p className="mt-3 border-t border-[#f5e8ed] pt-3 text-xs leading-6 text-[#987987]">
            {Array.isArray(producto.caracteristicas)
              ? producto.caracteristicas.join(" · ")
              : producto.caracteristicas}
          </p>
        )}
      </div>
    </article>
  );
}
