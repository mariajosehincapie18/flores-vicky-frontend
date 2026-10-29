
import Link from "next/link";
import CatalogoProductos from "@/features/catalogo/components/CatalogoProductos";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff7f9]">
      {/* Encabezado */}
      <header className="sticky top-0 z-50 border-b border-[#f0dce4]/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="shrink-0">
            <p className="text-lg font-semibold tracking-tight text-[#81334f] sm:text-xl">
              Flores y Detalles Vicky
            </p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#a77b8e] sm:text-[10px]">
              Momentos que florecen
            </p>
          </Link>

          <nav className="flex items-center gap-4 text-xs font-medium text-[#795f6b] sm:gap-7 sm:text-sm">
            <Link href="/" className="transition hover:text-[#a5446b]">
              Inicio
            </Link>
            <Link
              href="#catalogo"
              className="transition hover:text-[#a5446b]"
            >
              Catálogo
            </Link>
            <Link
              href="#contacto"
              className="hidden transition hover:text-[#a5446b] sm:inline"
            >
              Contacto
            </Link>
          </nav>
        </div>
      </header>

      {/* Portada principal */}
      <section className="overflow-hidden bg-[#f9e8ee]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-16">
          <div className="relative z-10 py-3 text-center lg:py-8 lg:text-left">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#a5446b]">
              Detalles hechos con el corazón
            </p>

            <h1 className="mx-auto max-w-xl text-4xl font-semibold leading-tight tracking-tight text-[#592e43] sm:text-5xl lg:mx-0 lg:text-6xl">
              Hay momentos que merecen{" "}
              <span className="font-serif italic text-[#a5446b]">
                florecer.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#795f6b] sm:text-base sm:leading-8 lg:mx-0">
              Flores, regalos y detalles especiales para expresar lo que
              las palabras a veces no pueden decir. Creamos sorpresas para
              acompañar tus momentos más importantes.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="#catalogo"
                className="rounded-full bg-[#a5446b] px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#a5446b]/15 transition hover:-translate-y-0.5 hover:bg-[#81334f]"
              >
                Descubrir nuestros arreglos
              </Link>

              <Link
                href="#contacto"
                className="rounded-full border border-[#d8a6b9] bg-white/70 px-7 py-3.5 text-sm font-semibold text-[#81334f] transition hover:bg-white"
              >
                Contáctanos
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 text-xs text-[#795f6b] lg:justify-start">
              <span className="text-lg text-[#a5446b]">♡</span>
              <span>Pequeños detalles, grandes emociones</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-white/60" />

            <div className="relative overflow-hidden rounded-[1.7rem] border-4 border-white shadow-xl shadow-[#81334f]/10">
              <img
                src="/imagenes/foto_familiar.jpeg"
                alt="Flores y detalles especiales de nuestra floristería"
                className="aspect-[4/3] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
              />
            </div>

            <div className="absolute -bottom-4 -left-2 rounded-2xl border border-[#f0dce4] bg-white px-5 py-3 shadow-lg sm:-left-5">
              <p className="text-xs font-semibold text-[#81334f]">
                Hecho con amor
              </p>
              <p className="mt-1 text-[10px] text-[#987987]">
                Para tus momentos especiales ♡
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo conectado a la API */}
      <CatalogoProductos />

      {/* Contacto */}
      <footer id="contacto" className="border-t border-[#f0dce4] bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a5446b]">
            Un detalle puede cambiarlo todo
          </p>

          <h2 className="mt-3 font-serif text-2xl text-[#592e43] sm:text-3xl">
            Hagamos florecer tus ideas
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#795f6b]">
            Gracias por elegir Flores y Detalles Vicky para acompañar
            tus celebraciones y regalar momentos inolvidables.
          </p>

          <div className="mt-7 border-t border-[#f5e8ed] pt-6">
            <p className="text-sm font-semibold text-[#81334f]">
              Flores y Detalles Vicky
            </p>
            <p className="mt-2 text-xs text-[#987987]">
              Cada detalle cuenta una historia.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
