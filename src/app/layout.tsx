import type { Metadata, Viewport } from "next";
import "../app/globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ShippingRates } from "@/components/ShippingRates";
import { tienda } from "@/lib/catalog";
import { obtenerUrlHosting } from "@/lib/env";
import Link from "next/link";
import { IconHanger, IconSparkles, IconClock } from "@/components/Icons";

export const metadata: Metadata = {
  metadataBase: new URL(obtenerUrlHosting()),
  title: {
    default: `${tienda.nombre} — ${tienda.descripcion}`,
    template: `%s · ${tienda.nombre}`,
  },
  description: `${tienda.descripcion}. ${tienda.eslogan}`,
  applicationName: tienda.nombre,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: tienda.nombre,
    title: `${tienda.nombre} — ${tienda.descripcion}`,
    description: `${tienda.descripcion}. ${tienda.eslogan}`,
    url: "/",
    images: [
      {
        url: "/img.jpeg",
        width: 1200,
        height: 630,
        alt: `Imagen de ${tienda.nombre}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${tienda.nombre} — ${tienda.descripcion}`,
    description: `${tienda.descripcion}. ${tienda.eslogan}`,
    images: ["/img.jpeg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4C1D95",
};

// 👇 CONSTANTE DE CONTROL (cambia a false para desactivar el mantenimiento)
const MOSTRAR_MANTENIMIENTO = true;

// 👇 COMPONENTE DE MANTENIMIENTO
function Mantenimiento() {
  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-lc-morado px-4 text-center text-white'>
      {/* Patrón de fondo sutil */}
      <div
        className='absolute inset-0 opacity-[0.02]'
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Resplandores muy suaves */}
      <div className='absolute -left-20 -top-20 h-64 w-64 rounded-full bg-lc-rosa/10 blur-[80px]' />
      <div className='absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-lc-rosa/10 blur-[80px]' />

      <div className='relative z-10 flex flex-col items-center'>
        {/* Icono pequeño y delicado */}
        <div className='relative mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5'>
          <IconHanger className='h-6 w-6 text-lc-rosa' />
          <IconSparkles className='absolute -right-1 -top-1 h-4 w-4 text-lc-rosa/80' />
        </div>

        <h1 className='text-2xl font-light tracking-wide sm:text-3xl'>
          Estamos <span className='text-lc-rosa font-normal'>renovando</span> el
          catálogo
        </h1>

        <p className='mt-2 max-w-xs text-xs leading-relaxed text-white/50 sm:text-sm'>
          Seleccionando las mejores prendas para ti. Volvemos en un ratito.
        </p>

        <div className='mt-4 flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/25'>
          <IconClock className='h-2.5 w-2.5' />
          <span>Tiempo estimado: breve</span>
        </div>

        <Link
          href='/'
          className='mt-8 inline-flex min-h-9 items-center justify-center rounded-full border border-lc-rosa/30 bg-transparent px-6 text-[11px] font-medium tracking-wide text-lc-rosa transition-all hover:border-lc-rosa hover:bg-lc-rosa hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lc-rosa'
        >
          Volver a intentar
        </Link>
      </div>

      <p className='absolute bottom-5 z-10 text-[9px] tracking-widest text-white/20'>
        © {new Date().getFullYear()} LaraShoping
      </p>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body>
        {MOSTRAR_MANTENIMIENTO ? (
          <Mantenimiento />
        ) : (
          <CartProvider>
            <div className='flex min-h-screen flex-col'>
              <Header />
              <main className='flex-1'>{children}</main>
              <Footer />
            </div>
            <ShippingRates />
          </CartProvider>
        )}
      </body>
    </html>
  );
}
