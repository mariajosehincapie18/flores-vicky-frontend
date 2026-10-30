
"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import type { Producto } from "@/features/catalogo/domain/producto";
import { obtenerProductoPorId } from "@/features/catalogo/services/productoService";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { obtenerToken } from "@/features/auth/services/authStorage";
import { http } from "@/features/common/http";

function DetalleProductoContenido() {
  const params = useParams();
  const router = useRouter();
  const { autenticado, cargando: cargandoSesion } = useAuth();

  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState("");

  useEffect(() => {
    async function cargarProducto() {
      try {
        const id = Number(params.id);

        if (!Number.isInteger(id) || id <= 0) {
          throw new Error("Producto no válido");
        }

        const resultado = await obtenerProductoPorId(id);
        setProducto(resultado);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudo cargar el producto"
        );
      } finally {
        setCargando(false);
      }
    }

    cargarProducto();
  }, [params.id]);

  async function enviarSolicitud(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!producto || !mensaje.trim()) return;

    setEnviando(true);
    setError("");
    setExito("");

    try {
      await http("/api/interacciones", {
        method: "POST",
        token: obtenerToken(),
        body: JSON.stringify({
          productoId: producto.id,
          mensaje: mensaje.trim(),
        }),
      });

      setExito("¡Tu solicitud fue enviada correctamente!");
      setMensaje("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo enviar la solicitud."
      );
    } finally {
      setEnviando(false);
    }
  }

  if (cargando || cargandoSesion) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff7f9]">
        <p className="text-[#a5446b]">Cargando producto...</p>
      </main>
    );
  }

  if (error && !producto) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#fff7f9]">
        <p className="text-[#81334f]">{error}</p>

        <Link href="/" className="text-[#a5446b] underline">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  if (!producto) return null;

  const imagen = producto.imagen
    ? producto.imagen.startsWith("http")
      ? producto.imagen
      : `/imagenes/${producto.imagen.split("/").pop()}`
    : null;

  const enlaceWhatsApp = `https://wa.me/573148308537?text=${encodeURIComponent(
    `Hola, estoy interesado(a) en ${producto.nombre}. Quisiera recibir información sobre domicilios y asesoría.`
  )}`;

  return (
    <main className="min-h-screen bg-[#fff7f9] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#catalogo"
          className="text-sm font-medium text-[#a5446b] hover:text-[#81334f]"
        >
          ← Volver al catálogo
        </Link>

        <section className="mt-8 grid overflow-hidden rounded-3xl border border-[#f0dce4] bg-white shadow-sm md:grid-cols-2">

          {/* Fotografía del producto */}
          <div className="min-h-[320px] bg-[#fff1f5] md:min-h-[520px]">
            {imagen ? (
              <img
                src={imagen}
                alt={producto.nombre}
                className="h-full min-h-[320px] w-full object-cover md:min-h-[520px]"
              />
            ) : (
              <div className="flex min-h-[320px] items-center justify-center text-[#987987]">
                Imagen próximamente
              </div>
            )}
          </div>

          {/* Información y formulario */}
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a5446b]">
              {producto.categoria}
            </p>

            <h1 className="mt-4 text-3xl font-semibold text-[#592e43] sm:text-4xl">
              {producto.nombre}
            </h1>

            <p className="mt-6 text-sm leading-8 text-[#795f6b]">
              {producto.descripcion}
            </p>

            {producto.caracteristicas && (
              <div className="mt-7 border-t border-[#f0dce4] pt-6">
                <h2 className="font-semibold text-[#81334f]">
                  Características
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#795f6b]">
                  {Array.isArray(producto.caracteristicas)
                    ? producto.caracteristicas.join(" · ")
                    : producto.caracteristicas}
                </p>
              </div>
            )}

            {/* Formulario de encargo */}
            {!autenticado ? (
              <button
                onClick={() =>
                  router.push(`/login?next=/productos/${producto.id}`)
                }
                className="mt-9 rounded-full bg-[#a5446b] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#81334f]"
              >
                Quiero encargar este producto
              </button>
            ) : (
              <form
                onSubmit={enviarSolicitud}
                className="mt-8 border-t border-[#f0dce4] pt-6"
              >
                <h2 className="text-xl font-semibold text-[#81334f]">
                  ¡Encarga este producto!
                </h2>

                <label className="mt-4 block text-sm font-medium text-[#592e43]">
                  Cuéntanos cómo deseas tu pedido
                </label>

                <textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                  rows={4}
                  placeholder="Escribe la cantidad, fecha deseada, colores o detalles especiales..."
                  className="mt-2 w-full rounded-xl border border-[#e7bfd0] bg-[#fffafd] p-4 text-sm text-[#592e43] outline-none focus:border-[#a5446b]"
                />

                <button
                  type="submit"
                  disabled={enviando || !mensaje.trim()}
                  className="mt-4 w-full rounded-full bg-[#a5446b] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#81334f] disabled:opacity-50"
                >
                  {enviando
                    ? "Enviando..."
                    : "Enviar solicitud de pedido"}
                </button>

                {exito && (
                  <p className="mt-4 text-sm font-medium text-green-700">
                    {exito}
                  </p>
                )}

                {error && (
                  <p className="mt-4 text-sm text-red-600">
                    {error}
                  </p>
                )}
              </form>
            )}

            {/* Contacto por WhatsApp */}
            <div className="mt-6 border-t border-[#f0dce4] pt-5">
              <p className="text-sm font-medium text-[#592e43]">
                ¿Necesitas un domicilio o asesoría?
              </p>

              <p className="mt-1 text-xs text-[#795f6b]">
                Escríbenos directamente. Estamos para ayudarte.
              </p>

              <a
                href={enlaceWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#20c76a] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#18a957]"
              >
                <span>☘</span>
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function DetalleProductoPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#fff7f9]">
          <p className="text-[#a5446b]">Cargando producto...</p>
        </main>
      }
    >
      <DetalleProductoContenido />
    </Suspense>
  );
}
