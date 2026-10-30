
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function RegisterForm() {
  const { registrar } = useAuth();
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setExito("");

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setEnviando(true);

    try {
      await registrar({ nombre, email, password });
      setExito("¡Tu cuenta fue creada correctamente!");

      setTimeout(() => router.push("/login"), 1200);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo crear la cuenta."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="w-full max-w-md rounded-3xl border border-[#f0dce4] bg-white p-7 shadow-xl shadow-[#81334f]/5 sm:p-9">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a5446b]">
          Flores y Detalles Vicky
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-[#592e43]">
          Crear cuenta
        </h1>
        <p className="mt-2 text-sm text-[#795f6b]">
          Regístrate y descubre nuestros detalles especiales.
        </p>
      </div>

      <form onSubmit={manejarEnvio} className="space-y-5">
        <div>
          <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-[#592e43]">
            Nombre completo
          </label>
          <input
            id="nombre"
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-[#ead5df] bg-[#fffafd] px-4 py-3 text-sm outline-none focus:border-[#a5446b] focus:ring-2 focus:ring-[#a5446b]/10"
          />
        </div>

        <div>
          <label htmlFor="registro-email" className="mb-2 block text-sm font-medium text-[#592e43]">
            Correo electrónico
          </label>
          <input
            id="registro-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            className="w-full rounded-xl border border-[#ead5df] bg-[#fffafd] px-4 py-3 text-sm outline-none focus:border-[#a5446b] focus:ring-2 focus:ring-[#a5446b]/10"
          />
        </div>

        <div>
          <label htmlFor="registro-password" className="mb-2 block text-sm font-medium text-[#592e43]">
            Contraseña
          </label>
          <input
            id="registro-password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            className="w-full rounded-xl border border-[#ead5df] bg-[#fffafd] px-4 py-3 text-sm outline-none focus:border-[#a5446b] focus:ring-2 focus:ring-[#a5446b]/10"
          />
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {exito && (
          <p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
            {exito}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-full bg-[#a5446b] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#81334f] disabled:opacity-60"
        >
          {enviando ? "Creando cuenta..." : "Crear mi cuenta"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-[#795f6b]">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-semibold text-[#a5446b] hover:text-[#81334f]">
          Inicia sesión
        </Link>
      </p>
    </section>
  );
}
