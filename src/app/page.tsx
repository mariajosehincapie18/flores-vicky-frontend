"use client";

import { useState } from "react";
import Link from "next/link";
import CatalogoProductos from "@/features/catalogo/components/CatalogoProductos";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";


export default function Home() {
  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const { usuario, autenticado, cargando, cerrar } = useAuth();
  const [mensajeContacto, setMensajeContacto] = useState("");
  const router = useRouter();

  const [enviandoConsulta, setEnviandoConsulta] = useState(false);
  const [respuestaConsulta, setRespuestaConsulta] = useState("");
  const [errorConsulta, setErrorConsulta] = useState("");

  
  return (
    <main id="inicio" className="min-h-screen bg-[#fff7f9]">
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

          

<nav className="flex items-center gap-4 text-xs font-medium sm:gap-7 sm:text-sm">
  {[
    { id: "inicio", nombre: "Inicio", href: "#inicio" },
    { id: "catalogo", nombre: "Catálogo", href: "#catalogo" },
    { id: "contacto", nombre: "Contacto", href: "#contacto" },
  ].map((item) => (
    <a
      key={item.id}
      href={item.href}
      onClick={() => setSeccionActiva(item.id)}
      className={`relative py-2 transition-colors duration-200 ${
        seccionActiva === item.id
          ? "font-bold text-[#81334f] after:scale-x-100"
          : "text-[#795f6b] hover:text-[#a5446b] after:scale-x-0"
      } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#a5446b] after:transition-transform after:duration-200`}
    >
      {item.nombre}
    </a>
  ))}

  {!cargando && (
    autenticado ? (
      <div className="flex items-center gap-3">
        <span className="hidden text-[#81334f] sm:inline">
          Hola, {usuario?.nombre}
        </span>
        {usuario?.role === "admin" && (
  <Link
    href="/admin"
    className="rounded-full border border-[#a5446b] px-4 py-2 text-[#81334f] transition hover:bg-[#f9e8ee]"
  >
    Administración
  </Link>
)}
        <button
          onClick={cerrar}
          className="rounded-full bg-[#a5446b] px-4 py-2 text-white transition hover:bg-[#81334f]"
        >
          Cerrar sesión
        </button>
      </div>
    ) : (
      <Link
        href="/login"
        className="rounded-full bg-[#a5446b] px-4 py-2 text-white transition hover:bg-[#81334f]"
      >
        Iniciar sesión
      </Link>
    )
  )}
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
<footer
  id="contacto"
  className="border-t border-[#f0dce4] bg-white px-5 py-14 sm:px-8"
>
  <div className="mx-auto max-w-5xl">
    <div className="text-center">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a5446b]">
        Estamos para ayudarte
      </p>

      <h2 className="mt-3 font-serif text-3xl text-[#592e43] sm:text-4xl">
        Hagamos florecer tus ideas
      </h2>

      <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#795f6b]">
        ¿Tienes alguna pregunta, necesitas una asesoría o quieres
        preparar un detalle especial? Nos encantará ayudarte.
      </p>
    </div>

    <div className="mt-10 grid gap-8 md:grid-cols-2">
      {/* Formulario */}
      <div className="rounded-3xl border border-[#f0dce4] bg-[#fff7f9] p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-[#592e43]">
          Escríbenos
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#795f6b]">
          Cuéntanos qué necesitas y nos pondremos en contacto contigo.
        </p>

        <form
          className="mt-6"
          onSubmit={async (e) => {
  e.preventDefault();

  if (!autenticado) {
    router.push(`/login?next=${encodeURIComponent("/#contacto")}`);
    return;
  }

  setEnviandoConsulta(true);
  setRespuestaConsulta("");
  setErrorConsulta("");

  try {
    const token = localStorage.getItem("vicky_token");

    const respuesta = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/consultas`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mensaje: mensajeContacto,
        }),
      }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || "No se pudo enviar la consulta");
    }

    setRespuestaConsulta("¡Tu mensaje fue enviado con éxito!");
    setMensajeContacto("");
  } catch (error) {
    setErrorConsulta(
      error instanceof Error
        ? error.message
        : "Ocurrió un error al enviar tu consulta"
    );
  } finally {
    setEnviandoConsulta(false);
  }
}}
        >
          <label className="block text-sm font-medium text-[#592e43]">
            Tu mensaje
          </label>

          <textarea
            value={mensajeContacto}
            onChange={(e) => setMensajeContacto(e.target.value)}
            required
            rows={5}
            placeholder="Escribe aquí tu consulta..."
            className="mt-2 w-full rounded-xl border border-[#e7bfd0] bg-white p-4 text-sm text-[#592e43] outline-none focus:border-[#a5446b]"
          />
<button
  type="submit"
  disabled={!mensajeContacto.trim() || enviandoConsulta}
  className="mt-4 w-full rounded-full bg-[#a5446b] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#81334f] disabled:opacity-50"
>
  {enviandoConsulta
    ? "Enviando..."
    : autenticado
      ? "Enviar consulta"
      : "Iniciar sesión para enviar"}
</button>

{respuestaConsulta && (
  <p className="mt-3 text-center text-sm font-medium text-green-700">
    {respuestaConsulta}
  </p>
)}

{errorConsulta && (
  <p className="mt-3 text-center text-sm font-medium text-red-600">
    {errorConsulta}
  </p>
)}

          {!autenticado && (
            <p className="mt-3 text-center text-xs text-[#987987]">
              Necesitas una cuenta para enviar tu consulta.
              <Link href="/registro" className="ml-1 font-semibold text-[#a5446b] underline">
                Regístrate aquí
              </Link>
            </p>
          )}
        </form>
      </div>

      {/* WhatsApp */}
      <div className="flex flex-col justify-center rounded-3xl bg-[#fff1f5] p-6 sm:p-8">
        <div className="text-4xl">♡</div>

        <h3 className="mt-4 text-xl font-semibold text-[#592e43]">
          ¿Prefieres hablar directamente?
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#795f6b]">
          Escríbenos por WhatsApp para consultar domicilios,
          recibir asesoría o resolver cualquier inquietud.
        </p>

        <a
          href="https://wa.me/573148308537?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20productos%20y%20servicios."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 flex items-center justify-center gap-2 rounded-full bg-[#20c76a] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#18a957]"
        >
          Consultar por WhatsApp
        </a>

        <p className="mt-4 text-center text-xs text-[#987987]">
          +57 314 830 8537
        </p>
      </div>
    </div>

    <div className="mt-12 border-t border-[#f5e8ed] pt-7 text-center">
      <p className="text-sm font-semibold text-[#81334f]">
        Flores y Detalles Vicky
      </p>

      <p className="mt-2 text-xs text-[#987987]">
        Cada detalle cuenta una historia. ♡
      </p>
    </div>
  </div>
</footer>

    </main>
  );
}
