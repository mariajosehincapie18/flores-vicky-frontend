import CatalogoProductos from "@/features/catalogo/components/CatalogoProductos";

export default function Home() {
  return (
    <main className="min-h-screen bg-rose-50">
      <header className="bg-white px-6 py-10 text-center shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-pink-600">
          Flores y Detalles Vicky
        </p>

        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
          Detalles que enamoran
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          Encuentra el arreglo perfecto para sorprender a las personas que más quieres.
        </p>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <CatalogoProductos />
      </div>
    </main>
  );
}
