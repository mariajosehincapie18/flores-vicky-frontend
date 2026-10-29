
const apiHost = process.env.NEXT_PUBLIC_API_HOST;

if (!apiHost) {
  throw new Error(
    "Falta configurar NEXT_PUBLIC_API_HOST en el archivo .env.local"
  );
}

export const API_BASE_URL = apiHost.replace(/\/+$/, "");
