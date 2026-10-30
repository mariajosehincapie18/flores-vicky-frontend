
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const { iniciar } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setEnviando(true);

    try {
      await iniciar({ email, password });
      const destino =
  new URLSearchParams(window.location.search).get("next") || "/";

router.push(destino);
router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo iniciar sesión."
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
          ¡Bienvenido!
        </h1>

        <p className="mt-2 text-sm text-[#795f6b]">
          Ingresa a tu cuenta para continuar.
        </p>
      </div>

      <form onSubmit={manejarEnvio} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#592e43]"
          >
            Correo electrónico
          </label>

          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            className="w-full rounded-xl border border-[#ead5df] bg-[#fffafd] px-4 py-3 text-sm text-[#492d39] outline-none transition focus:border-[#a5446b] focus:ring-2 focus:ring-[#a5446b]/10"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-[#592e43]"
          >
            Contraseña
          </label>

          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            className="w-full rounded-xl border border-[#ead5df] bg-[#fffafd] px-4 py-3 text-sm text-[#492d39] outline-none transition focus:border-[#a5446b] focus:ring-2 focus:ring-[#a5446b]/10"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-full bg-[#a5446b] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#81334f] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-[#795f6b]">
        ¿Todavía no tienes cuenta?{" "}
        <Link
          href="/registro"
          className="font-semibold text-[#a5446b] hover:text-[#81334f]"
        >
          Regístrate aquí
        </Link>
      </p>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-xs text-[#987987] transition hover:text-[#81334f]"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
