"use client";

import Link from "next/link";
import { IconHanger, IconSparkles, IconClock } from "@/components/Icons";

export function Mantenimiento() {
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

      {/* Contenido central, sin tarjeta, más limpio */}
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

        {/* Separador muy sutil */}
        <div className='mt-4 flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/25'>
          <IconClock className='h-2.5 w-2.5' />
          <span>Tiempo estimado: breve</span>
        </div>

        {/* Botón fino y elegante */}
        <Link
          href='/'
          className='mt-8 inline-flex min-h-9 items-center justify-center rounded-full border border-lc-rosa/30 bg-transparent px-6 text-[11px] font-medium tracking-wide text-lc-rosa transition-all hover:border-lc-rosa hover:bg-lc-rosa hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lc-rosa'
        >
          Volver a intentar
        </Link>
      </div>

      {/* Pie de página */}
      <p className='absolute bottom-5 z-10 text-[9px] tracking-widest text-white/20'>
        © {new Date().getFullYear()} LaraShoping
      </p>
    </div>
  );
}
