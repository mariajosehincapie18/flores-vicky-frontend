
import { API_BASE_URL } from "./config";

type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: HeadersInit;
  token?: string | null;
};

export async function http<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, headers, ...requestOptions } = options;
  const requestHeaders = new Headers(headers);

  if (
    requestOptions.body &&
    !(requestOptions.body instanceof FormData) &&
    !requestHeaders.has("Content-Type")
  ) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...requestOptions,
      headers: requestHeaders,
    });
  } catch {
    throw new Error("No fue posible conectar con el servidor.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type");
  const data: unknown = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "mensaje" in data &&
      typeof data.mensaje === "string"
        ? data.mensaje
        : typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof data.message === "string"
          ? data.message
          : `Error en la petición (${response.status})`;

    if (response.status === 401) {
      throw new Error("Tu sesión ha expirado o no tienes autorización.");
    }

    throw new Error(message);
  }

  return data as T;
}
