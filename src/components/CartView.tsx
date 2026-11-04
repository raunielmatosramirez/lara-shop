"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBag,
  IconCheck,
  IconMinus,
  IconPlus,
  IconRuler,
  IconTrash,
  IconTruck,
  IconWhatsApp,
} from "@/components/Icons";
import { tienda } from "@/lib/catalog";
import { obtenerDireccionRecogida, obtenerNumeroWhatsApp } from "@/lib/env";
import { abrirRecogida, abrirTarifas } from "@/lib/events";
import { formatearPrecio } from "@/lib/format";
import {
  calcularTotal,
  construirEnlaceWhatsApp,
  construirMensajePedido,
  obtenerLineasPedido,
} from "@/lib/order";

export function CartView() {
  const { items, hydrated, actualizarCantidad, eliminarItem } = useCart();
  const [nombrePedido, setNombrePedido] = useState("");
  const lineas = obtenerLineasPedido(items);
  const total = calcularTotal(items);
  const numeroWhatsApp = obtenerNumeroWhatsApp();
  const direccionRecogida = obtenerDireccionRecogida();
  const mensaje = construirMensajePedido(
    items,
    tienda.simboloMoneda,
    nombrePedido,
  );
  const enlacePedido = numeroWhatsApp
    ? construirEnlaceWhatsApp(numeroWhatsApp, mensaje)
    : null;

  if (!hydrated) {
    return (
      <div
        className='rounded-xl bg-lc-blanco p-6 text-sm text-black/60'
        aria-busy='true'
        aria-live='polite'
      >
        Cargando carrito…
      </div>
    );
  }

  if (lineas.length === 0) {
    return (
      <div className='relative overflow-hidden rounded-2xl bg-lc-blanco px-6 py-12 text-center'>
        <span className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lc-rosa/10 text-lc-rosa'>
          <IconBag className='h-7 w-7' />
        </span>
        <p className='mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-lc-rosa'>
          Carrito vacío
        </p>
        <h2 className='mt-2 text-xl font-bold tracking-tight sm:text-2xl'>
          Todavía no has elegido tu look
        </h2>
        <p className='mx-auto mt-2 max-w-md text-xs leading-relaxed text-black/60 sm:text-sm'>
          Explora el catálogo y añade tus prendas favoritas. Después podrás
          solicitar la reserva por WhatsApp.
        </p>
        <Link
          href='/catalogo'
          className='mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-lc-morado px-5 text-sm font-semibold text-white transition-colors hover:bg-lc-morado/90'
        >
          Ver catálogo
          <IconArrowRight className='h-4 w-4' />
        </Link>
      </div>
    );
  }

  const totalArticulos = lineas.reduce(
    (acc, linea) => acc + linea.item.cantidad,
    0,
  );

  return (
    <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start'>
      {/* Lista de líneas */}
      <div>
        <ul className='space-y-3'>
          {lineas.map(({ item, producto, subtotal }) => (
            <li
              key={item.productoId}
              className='rounded-xl bg-white p-3 sm:p-4'
            >
              <div className='flex gap-3'>
                {/* Imagen compacta */}
                <Link
                  href={`/producto/${producto.id}`}
                  className='w-16 shrink-0 overflow-hidden rounded-lg bg-white sm:w-20'
                  aria-label={`Ver ${producto.nombre}`}
                >
                  <img
                    src={producto.imagenes[0]}
                    alt={producto.nombre}
                    loading='lazy'
                    className='aspect-square h-full w-full object-contain p-1'
                  />
                </Link>

                <div className='flex min-w-0 flex-1 flex-col'>
                  {/* Nombre + eliminar */}
                  <div className='flex items-start justify-between gap-2'>
                    <h3 className='text-xs font-semibold leading-snug sm:text-sm'>
                      <Link
                        href={`/producto/${producto.id}`}
                        className='line-clamp-2 transition-colors hover:text-lc-morado'
                      >
                        {producto.nombre}
                      </Link>
                    </h3>
                    <button
                      type='button'
                      onClick={() => eliminarItem(producto.id)}
                      aria-label={`Eliminar ${producto.nombre} del carrito`}
                      className='shrink-0 rounded-full p-1 text-black/40 transition-colors hover:bg-lc-rosa/10 hover:text-lc-rosa'
                    >
                      <IconTrash className='h-4 w-4' />
                    </button>
                  </div>

                  {/* Talla informativa */}
                  <div className='mt-1.5 flex flex-wrap gap-1'>
                    <span className='inline-flex items-center gap-1 rounded-full bg-lc-morado/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-lc-morado'>
                      <IconRuler className='h-3 w-3' />
                      Talla única · XS a M
                    </span>
                  </div>

                  {/* Cantidad + subtotal */}
                  <div className='mt-2.5 flex flex-wrap items-center justify-between gap-2'>
                    <div className='inline-flex items-center rounded-full bg-white'>
                      <button
                        type='button'
                        onClick={() =>
                          actualizarCantidad(producto.id, item.cantidad - 1)
                        }
                        disabled={item.cantidad <= 1}
                        aria-label={`Reducir cantidad de ${producto.nombre}`}
                        className='flex h-8 w-8 items-center justify-center rounded-l-full transition-colors hover:bg-lc-morado hover:text-white disabled:cursor-not-allowed disabled:text-black/25 disabled:hover:bg-transparent disabled:hover:text-black/25'
                      >
                        <IconMinus className='h-3.5 w-3.5' />
                      </button>
                      <span
                        className='flex h-8 min-w-8 items-center justify-center px-1 text-xs font-semibold'
                        aria-label={`Cantidad: ${item.cantidad}`}
                      >
                        {item.cantidad}
                      </span>
                      <button
                        type='button'
                        onClick={() =>
                          actualizarCantidad(producto.id, item.cantidad + 1)
                        }
                        disabled={item.cantidad >= 99}
                        aria-label={`Aumentar cantidad de ${producto.nombre}`}
                        className='flex h-8 w-8 items-center justify-center rounded-r-full transition-colors hover:bg-lc-morado hover:text-white disabled:cursor-not-allowed disabled:text-black/25 disabled:hover:bg-transparent disabled:hover:text-black/25'
                      >
                        <IconPlus className='h-3.5 w-3.5' />
                      </button>
                    </div>

                    <p className='text-sm font-bold text-lc-morado'>
                      {formatearPrecio(subtotal, tienda.simboloMoneda)}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href='/catalogo'
          className='mt-4 inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-lc-morado transition-colors hover:text-lc-rosa'
        >
          <IconArrowLeft className='h-3.5 w-3.5' />
          Seguir comprando
        </Link>
      </div>

      {/* Resumen */}
      <aside className='overflow-hidden rounded-2xl bg-white p-4 sm:p-5 lg:sticky lg:top-24'>
        <h2 className='flex items-center gap-2 text-base font-bold tracking-tight sm:text-lg'>
          <IconBag className='h-4 w-4 text-lc-rosa' />
          Resumen del pedido
        </h2>

        <dl className='mt-3 space-y-2 pb-3 text-xs sm:text-sm'>
          <div className='flex items-center justify-between gap-3'>
            <dt className='text-black/60'>Artículos</dt>
            <dd className='font-semibold'>{totalArticulos}</dd>
          </div>
          <div className='flex items-center justify-between gap-3'>
            <dt className='flex items-center gap-1.5 text-black/60'>
              <IconTruck className='h-3.5 w-3.5 text-lc-morado' />
              Envío
            </dt>
            <dd className='font-medium'>A convenir</dd>
          </div>
        </dl>

        <div className='flex items-center justify-between gap-3 py-3'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60'>
            Total
          </p>
          <p className='text-lg font-bold text-lc-morado sm:text-xl'>
            {formatearPrecio(total, tienda.simboloMoneda)}
          </p>
        </div>

        <div className='mb-3 rounded-lg bg-lc-morado/5 p-3'>
          <p className='text-[11px] leading-relaxed text-black/60'>
            Puedes revisar nuestro listado de tarifas de entrega.
          </p>
          <button
            type='button'
            onClick={abrirTarifas}
            className='mt-1 text-[11px] font-semibold text-lc-morado transition-colors hover:text-lc-rosa'
          >
            Ver tarifas de entrega
          </button>

          {direccionRecogida ? (
            <>
              <p className='mt-2 text-[11px] leading-relaxed text-black/60'>
                O recoger en local: {direccionRecogida}.
              </p>
              <button
                type='button'
                onClick={abrirRecogida}
                className='mt-1 text-[11px] font-semibold text-lc-morado transition-colors hover:text-lc-rosa'
              >
                Ver mapa de recogida
              </button>
            </>
          ) : null}
        </div>

        <div className='mt-3'>
          <label
            htmlFor='nombre-pedido'
            className='text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60'
          >
            Nombre para identificar el pedido
          </label>
          <input
            id='nombre-pedido'
            type='text'
            value={nombrePedido}
            onChange={(evento) => setNombrePedido(evento.target.value)}
            placeholder='Maria Hernandez'
            maxLength={80}
            className='mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none transition-colors placeholder:text-black/35 focus:border-lc-morado focus:ring-1 focus:ring-lc-morado'
          />
        </div>

        <p className='mt-3 text-[11px] leading-relaxed text-black/55'>
          El pago y el envío se acuerdan directamente por WhatsApp. Al pulsar el
          botón se abrirá tu aplicación con la solicitud de reserva ya escrita.
        </p>

        {enlacePedido ? (
          <a
            href={enlacePedido}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-4 flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-lc-morado px-4 text-sm font-semibold text-white transition-colors hover:bg-lc-morado/90'
          >
            <IconWhatsApp className='h-4 w-4' />
            Solicitar reserva por WhatsApp
          </a>
        ) : (
          <p
            role='alert'
            className='mt-4 rounded-lg bg-red-50 p-2.5 text-[11px] leading-relaxed text-red-800'
          >
            Falta configurar NEXT_PUBLIC_WHATSAPP_NUMBER. Añade tu número con
            prefijo de país en el archivo .env.local.
          </p>
        )}

        <p className='mt-2 flex items-center justify-center gap-1 text-center text-[10px] text-black/45'>
          <IconCheck className='h-3 w-3 text-lc-rosa' />
          No se realiza ningún cobro en esta web.
        </p>
      </aside>
    </div>
  );
}
