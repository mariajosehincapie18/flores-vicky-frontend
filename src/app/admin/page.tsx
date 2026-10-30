
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { obtenerToken } from "../../features/auth/services/authStorage";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  type DatosProducto,
} from "../../features/catalogo/services/productoService";
import type { Producto } from "../../features/catalogo/domain/producto";

const formularioVacio: DatosProducto = {
  nombre: "",
  categoria: "",
  imagen: "",
  descripcion: "",
  caracteristicas: "",
};

export default function AdminPage() {
  const { usuario, cargando } = useAuth();
  const router = useRouter();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [formulario, setFormulario] = useState<DatosProducto>(formularioVacio);
  const [productoEditando, setProductoEditando] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [procesando, setProcesando] = useState(false);

  async function cargarProductos() {
    try {
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch {
      setError("No se pudieron cargar los productos.");
    }
  }

  useEffect(() => {
    if (cargando) return;

    if (!usuario) {
      router.replace("/login");
      return;
    }

    if (usuario.role !== "admin") {
      router.replace("/");
      return;
    }

    cargarProductos();
  }, [usuario, cargando, router]);

  function cambiarCampo(
    campo: keyof DatosProducto,
    valor: string
  ) {
    setFormulario((actual) => ({
      ...actual,
      [campo]: valor,
    }));
  }

  async function guardarProducto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const token = obtenerToken();
    if (!token) {
      setError("Debes iniciar sesión nuevamente.");
      return;
    }

    setProcesando(true);
    setError("");
    setMensaje("");

    try {
      if (productoEditando !== null) {
        await actualizarProducto(productoEditando, formulario, token);
        setMensaje("Producto actualizado correctamente.");
      } else {
        await crearProducto(formulario, token);
        setMensaje("Producto creado correctamente.");
      }

      setFormulario(formularioVacio);
      setProductoEditando(null);
      await cargarProductos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error.");
    } finally {
      setProcesando(false);
    }
  }

  function editar(producto: Producto) {
    setProductoEditando(producto.id);
    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      imagen: producto.imagen ?? "",
      descripcion: producto.descripcion ?? "",
      caracteristicas: Array.isArray(producto.caracteristicas)
        ? producto.caracteristicas.join(" | ")
        : producto.caracteristicas ?? "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function eliminar(id: number) {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    const token = obtenerToken();
    if (!token) {
      setError("Debes iniciar sesión nuevamente.");
      return;
    }

    setError("");
    setMensaje("");

    try {
      await eliminarProducto(id, token);
      setMensaje("Producto eliminado correctamente.");
      await cargarProductos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar.");
    }
  }

  if (cargando || !usuario || usuario.role !== "admin") {
    return <main className="p-10 text-center">Verificando acceso...</main>;
  }

  return (
   
<main className="min-h-screen bg-[#fff7f9] px-5 py-10">
  <div className="mx-auto max-w-5xl">
    <button
      onClick={() => router.push("/")}
      className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d8a6b9] bg-white px-5 py-3 text-sm font-semibold text-[#81334f] shadow-sm transition hover:bg-[#f9e8ee]"
    >
      ← Volver a la tienda
    </button>

        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Administración de productos
        </h1>
        <p className="mb-8 text-gray-600">
          Bienvenido, {usuario.nombre}. Gestiona el catálogo de Flores y
          Detalles Vicky.
        </p>

        <form
          onSubmit={guardarProducto}
          className="mb-10 rounded-xl bg-white p-6 shadow"
        >
          <h2 className="mb-5 text-xl font-semibold">
            {productoEditando !== null ? "Editar producto" : "Crear producto"}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              required
              placeholder="Nombre del producto"
              value={formulario.nombre}
              onChange={(e) => cambiarCampo("nombre", e.target.value)}
              className="rounded-lg border p-3"
            />

            <input
              required
              placeholder="Categoría"
              value={formulario.categoria}
              onChange={(e) => cambiarCampo("categoria", e.target.value)}
              className="rounded-lg border p-3"
            />

            <input
              required
              placeholder="Ruta de imagen"
              value={formulario.imagen}
              onChange={(e) => cambiarCampo("imagen", e.target.value)}
              className="rounded-lg border p-3 md:col-span-2"
            />

            <textarea
              required
              placeholder="Descripción"
              value={formulario.descripcion}
              onChange={(e) => cambiarCampo("descripcion", e.target.value)}
              className="rounded-lg border p-3 md:col-span-2"
              rows={3}
            />

            <textarea
              required
              placeholder="Características"
              value={formulario.caracteristicas}
              onChange={(e) => cambiarCampo("caracteristicas", e.target.value)}
              className="rounded-lg border p-3 md:col-span-2"
              rows={3}
            />
          </div>

          {error && <p className="mt-4 text-red-600">{error}</p>}
          {mensaje && <p className="mt-4 text-green-700">{mensaje}</p>}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              disabled={procesando}
              className="rounded-lg bg-[#a5446b] px-6 py-3 text-white transition hover:bg-[#81334f] disabled:opacity-50"
            >
              {procesando
                ? "Guardando..."
                : productoEditando !== null
                  ? "Guardar cambios"
                  : "Crear producto"}
            </button>

            {productoEditando !== null && (
              <button
                type="button"
                onClick={() => {
                  setProductoEditando(null);
                  setFormulario(formularioVacio);
                }}
                className="rounded-lg border px-6 py-3"
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>

        <h2 className="mb-5 text-xl font-semibold">
          Productos registrados ({productos.length})
        </h2>

        <div className="space-y-3">
          {productos.map((producto) => (
            <article
              key={producto.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#f0dce4] bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div>
                <h3 className="font-semibold text-gray-800">
                  {producto.nombre}
                </h3>
                <p className="text-sm text-gray-500">
                  {producto.categoria} · ID: {producto.id}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editar(producto)}
                  className="rounded-full bg-[#a5446b] px-5 py-2 text-white transition hover:bg-[#81334f]"
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminar(producto.id)}
                  className="rounded-full border border-[#a5446b] bg-white px-5 py-2 text-[#81334f] transition hover:bg-[#f9e8ee]"
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
