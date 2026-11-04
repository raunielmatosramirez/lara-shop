"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";
import {
  IconArrowLeft,
  IconBag,
  IconChat,
  IconHanger,
  IconHome,
  IconRuler,
  IconShare,
} from "@/components/Icons";
import { getCategoria, tienda } from "@/lib/catalog";
import { obtenerUrlHosting } from "@/lib/env";
import { formatearPrecio } from "@/lib/format";
import { construirEnlaceCompartir, construirUrlProducto } from "@/lib/order";
import type { Producto } from "@/lib/types";

export function ProductDetail({ producto }: { producto: Producto }) {
  const { addItem } = useCart();
  const [imagenActiva, setImagenActiva] = useState(0);
  const [anadido, setAnadido] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  const categoria = getCategoria(producto.categoria);
  const hosting = obtenerUrlHosting();
  const urlProducto = construirUrlProducto(hosting, producto.id);
  const enlaceCompartir = construirEnlaceCompartir(
    producto.nombre,
    urlProducto,
  );

  useEffect(() => {
    return () => {
      if (temporizador.current) {
        clearTimeout(temporizador.current);
      }
    };
  }, []);

  function anadirAlCarrito() {
    addItem(producto.id);
    setAnadido(true);

    if (temporizador.current) {
      clearTimeout(temporizador.current);
    }

    temporizador.current = setTimeout(() => setAnadido(false), 2500);
  }

  return (
    <div>
      {/* Migas de pan compactas */}
      <nav
        aria-label='Migas de pan'
        className='mb-3 flex flex-wrap items-center gap-1 text-[10px] text-black/45'
      >
        <Link
          href='/'
          className='inline-flex min-h-6 items-center gap-0.5 hover:text-lc-morado'
        >
          <IconHome className='h-2.5 w-2.5' />
          Inicio
        </Link>
        <span aria-hidden='true'>/</span>
        <Link
          href='/catalogo'
          className='inline-flex min-h-6 items-center gap-0.5 hover:text-lc-morado'
        >
          <IconHanger className='h-2.5 w-2.5' />
          Catálogo
        </Link>
        <span aria-hidden='true'>/</span>
        <span aria-current='page' className='max-w-full truncate text-black/65'>
          {producto.nombre}
        </span>
      </nav>

      {/* Grid ajustado: La columna de la imagen ahora es más estrecha */}
      <div className='grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,4fr)] md:gap-8 lg:gap-10'>
        {/* Imagen (Ahora más pequeña y centrada) */}
        <div className='w-full max-w-sm mx-auto md:mx-0'>
          <div className='overflow-hidden rounded-lg border border-lc-morado/10 bg-white'>
            <img
              src={producto.imagenes[imagenActiva]}
              alt={`${producto.nombre} — imagen ${imagenActiva + 1}`}
              loading='eager'
              className='aspect-square h-full w-full object-contain p-2 sm:p-3'
            />
          </div>

          {producto.imagenes.length > 1 ? (
            <div
              role='group'
              aria-label='Miniaturas del producto'
              className='mt-1.5 flex gap-1 overflow-x-auto pb-1 justify-center md:justify-start'
            >
              {producto.imagenes.map((imagen, indice) => (
                <button
                  key={imagen}
                  type='button'
                  onClick={() => setImagenActiva(indice)}
                  aria-label={`Ver imagen ${indice + 1} de ${producto.imagenes.length}`}
                  aria-pressed={imagenActiva === indice}
                  className={`aspect-square w-10 shrink-0 overflow-hidden rounded border-2 bg-white transition-colors ${
                    imagenActiva === indice
                      ? "border-lc-morado"
                      : "border-transparent hover:border-black/15"
                  }`}
                >
                  <img
                    src={imagen}
                    alt=''
                    loading='lazy'
                    className='h-full w-full object-contain p-0.5'
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Información */}
        <div className='flex flex-col'>
          <div className='flex flex-wrap items-center gap-1'>
            {categoria ? (
              <span className='inline-flex w-fit rounded-full bg-lc-morado/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-lc-morado'>
                {categoria.nombre}
              </span>
            ) : null}
          </div>

          <h1 className='mt-1 text-lg font-bold leading-tight tracking-tight sm:text-xl lg:text-2xl'>
            {producto.nombre}
          </h1>

          <p className='mt-1 text-base font-bold text-lc-morado sm:text-lg'>
            {formatearPrecio(producto.precio, tienda.simboloMoneda)}
          </p>

          <p className='mt-2 text-[11px] leading-relaxed text-black/60 sm:text-xs'>
            {producto.descripcion}
          </p>

          {/* Talla informativa */}
          <div className='mt-3'>
            <p className='flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-black/55'>
              <IconRuler className='h-2.5 w-2.5 text-lc-rosa' />
              Talla
            </p>
            <p className='mt-0.5 text-xs font-semibold text-lc-morado'>
              Talla única · XS a M
            </p>
            <p className='mt-0.5 text-[10px] leading-relaxed text-black/45'>
              Todas nuestras prendas tienen una talla flexible equivalente de la
              XS a la M. No es necesario elegir talla.
            </p>
          </div>

          {/* Acciones */}
          <div className='mt-3 flex flex-col gap-1.5 sm:flex-row'>
            <button
              type='button'
              onClick={anadirAlCarrito}
              className='inline-flex min-h-8 flex-1 items-center justify-center gap-1.5 rounded-full bg-lc-morado px-3 text-xs font-semibold text-white transition-colors hover:bg-lc-morado/90'
            >
              <IconBag className='h-3.5 w-3.5' />
              {anadido ? "Añadido ✓" : "Añadir al carrito"}
            </button>

            <a
              href={enlaceCompartir}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex min-h-8 flex-1 items-center justify-center gap-1.5 rounded-full border border-lc-morado px-3 text-xs font-semibold text-lc-morado transition-colors hover:bg-lc-morado hover:text-white'
            >
              <IconShare className='h-3.5 w-3.5' />
              Compartir
            </a>
          </div>

          <div
            className='mt-1 min-h-4 text-[10px]'
            role='status'
            aria-live='polite'
          >
            {anadido ? (
              <p className='text-lc-morado'>
                Producto añadido.{" "}
                <Link
                  href='/carrito'
                  className='font-semibold hover:text-lc-rosa'
                >
                  Ver carrito
                </Link>
              </p>
            ) : null}
          </div>

          <div className='mt-3 text-[10px] leading-relaxed text-black/45'>
            <p className='flex items-center gap-1'>
              <IconChat className='h-3 w-3 text-lc-rosa' />
              Pedido y envío se acuerdan directamente por WhatsApp.
            </p>
            <p className='mt-0.5'>
              Si tienes cualquier duda, escríbenos por WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* Volver */}
      <div className='mt-4'>
        <Link
          href='/catalogo'
          className='inline-flex min-h-7 items-center gap-1 pb-0.5 text-[11px] font-semibold text-lc-morado transition-colors hover:text-lc-rosa'
        >
          <IconArrowLeft className='h-3 w-3' />
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}
