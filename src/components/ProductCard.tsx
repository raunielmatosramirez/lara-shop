"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { IconArrowRight, IconStar, IconoCategoria } from "@/components/Icons";
import { getCategoria, tienda } from "@/lib/catalog";
import { formatearPrecio } from "@/lib/format";
import type { Producto } from "@/lib/types";

export function ProductCard({ producto }: { producto: Producto }) {
  useCart();
  const categoria = getCategoria(producto.categoria);

  return (
    <article className='group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-lc-negro/5 transition-all duration-200 hover:shadow-md hover:ring-lc-morado/15'>
      <Link
        href={`/producto/${producto.id}`}
        className='relative block aspect-square overflow-hidden bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lc-morado sm:aspect-[6/5]'
        aria-label={`Ver ${producto.nombre}`}
      >
        <img
          src={producto.imagenes[0]}
          alt={producto.nombre}
          loading='lazy'
          className='h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-[1.03] sm:p-1.5'
        />
        {producto.destacado ? (
          <span
            aria-label='Producto destacado'
            className='absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full border border-lc-rosa bg-white/90 text-lc-rosa shadow-sm'
          >
            <IconStar className='h-2.5 w-2.5' />
          </span>
        ) : null}
        <span className='absolute right-1 top-1 inline-flex items-center rounded-full bg-white/90 px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.05em] text-lc-morado shadow-sm sm:text-[8px]'>
          {producto.id}
        </span>
      </Link>

      <div className='flex flex-1 flex-col p-1.5 sm:p-2'>
        <div className='mb-1 flex flex-wrap items-center gap-1'>
          {categoria ? (
            <span className='inline-flex w-fit max-w-full items-center gap-0.5 truncate rounded-full bg-lc-morado/10 px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.08em] text-lc-morado sm:text-[8px]'>
              <IconoCategoria id={producto.categoria} className='h-2 w-2' />
              {categoria.nombre}
            </span>
          ) : null}
        </div>

        <h3 className='text-[10px] font-semibold leading-tight sm:text-[11px] md:text-xs'>
          <Link
            href={`/producto/${producto.id}`}
            className='line-clamp-2 transition-colors hover:text-lc-morado'
          >
            {producto.nombre}
          </Link>
        </h3>

        {/* Descripción en gris debajo del nombre */}
        <p className='mt-0.5 line-clamp-2 text-[8px] leading-tight text-lc-negro/50 sm:text-[9px]'>
          {producto.descripcion}
        </p>

        <p className='mt-0.5 text-[11px] font-bold text-lc-morado sm:text-xs md:text-sm'>
          {formatearPrecio(producto.precio, tienda.simboloMoneda)}
        </p>

        <div className='mt-auto pt-1.5 sm:pt-2'>
          <Link
            href={`/producto/${producto.id}`}
            className='inline-flex min-h-[26px] w-full items-center justify-center gap-0.5 rounded-full bg-lc-morado px-1.5 text-[9px] font-semibold text-white transition-colors duration-200 hover:bg-lc-morado/90 active:scale-[0.98] sm:min-h-[30px] sm:px-2 sm:text-[10px]'
          >
            Ver producto
            <IconArrowRight className='h-2.5 w-2.5' />
          </Link>
        </div>
      </div>
    </article>
  );
}
