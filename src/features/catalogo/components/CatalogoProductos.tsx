
"use client";

import { useProductos } from "../hooks/useProductos";
import TarjetaProducto from "./TarjetaProducto";

export default function CatalogoProductos() {
  const { productos, cargando, error, recargar } = useProductos();

  if (cargando) {
    return (
      <section className="px-5 py-20 text-center">
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-[#f3dce5] border-t-[#a5446b]" />
        <p className="text-sm tracking-wide text-[#795f6b]">
          Preparando algo especial para ti...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-5 py-20 text-center">
        <p className="mb-5 text-[#81334f]">{error}</p>
        <button
          onClick={recargar}
          className="rounded-full bg-[#a5446b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#81334f]"
        >
          Intentar nuevamente
        </button>
      </section>
    );
  }

  if (productos.length === 0) {
    return (
      <section className="px-5 py-20 text-center">
        <p className="mb-3 text-2xl text-[#a5446b]">♡</p>
        <h2 className="text-xl font-semibold text-[#592e43]">
          Estamos preparando nuevas sorpresas
        </h2>
        <p className="mt-2 text-sm text-[#795f6b]">
          Pronto tendremos más detalles para ti.
        </p>
      </section>
    );
  }

  return (
    <section
      id="catalogo"
      className="scroll-mt-24 bg-[#fff7f9] px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#a5446b]">
            Hechos con amor para ti
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-[#592e43] sm:text-4xl">
            Nuestros productos
          </h2>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#d99ab4]" />

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#795f6b] sm:text-base">
            Descubre flores, detalles y creaciones especiales para
            acompañar los momentos más importantes de tu vida.
          </p>

          <p className="mt-4 text-xs font-medium tracking-wide text-[#987987]">
            {productos.length} productos disponibles
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-7">
          {productos.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              producto={producto}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm text-[#795f6b]">
            Cada detalle cuenta una historia especial.
          </p>
          <p className="mt-2 text-sm font-semibold text-[#a5446b]">
            Flores y Detalles Vicky
          </p>
        </div>
      </div>
    </section>
  );
}
