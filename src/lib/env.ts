import { tienda } from "@/lib/catalog";

// Lee el número desde las variables de entorno públicas de Next.js.
// Si falta, avisa en consola y devuelve null para no romper la interfaz.
export function obtenerNumeroWhatsApp(): string | null {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

  if (!numero) {
    return null;
  }

  return numero;
}

// Asegura que la URL tenga protocolo para poder usarla en `new URL`.
function normalizarUrl(url: string): string {
  const limpia = url.trim().replace(/\/+$/, "");
  return /^https?:\/\//i.test(limpia) ? limpia : `https://${limpia}`;
}

// La URL de hosting se usa para compartir productos y construir enlaces absolutos.
export function obtenerUrlHosting(): string {
  const url = process.env.NEXT_PUBLIC_HOSTING_URL?.trim();

  if (!url) {
    return normalizarUrl(tienda.hosting);
  }

  return normalizarUrl(url);
}

// Dirección física opcional para la recogida en local.
export function obtenerDireccionRecogida(): string | null {
  const direccion = process.env.NEXT_PUBLIC_DIRECCION_RECOGIDA?.trim();
  return direccion ? direccion : null;
}

export interface Coordenadas {
  lat: number;
  lng: number;
}

// Coordenadas exactas opcionales, con formato "lat,lng".
export function obtenerCoordenadasRecogida(): Coordenadas | null {
  const valor = process.env.NEXT_PUBLIC_COORDENADAS_RECOGIDA?.trim();

  if (!valor) {
    return null;
  }

  const [latTexto, lngTexto] = valor.split(",").map((parte) => parte.trim());

  if (!latTexto || !lngTexto) {
    return null;
  }

  const lat = Number(latTexto);
  const lng = Number(lngTexto);

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    Math.abs(lat) > 90 ||
    Math.abs(lng) > 180
  ) {
    return null;
  }

  return { lat, lng };
}
