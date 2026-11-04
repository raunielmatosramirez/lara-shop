"use client";

import Link from "next/link";
import { CatalogView } from "@/components/CatalogView";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import {
  IconArrowRight,
  IconCheck,
  IconRuler,
  IconSparkles,
  IconWhatsApp,
} from "@/components/Icons";
import { tienda } from "@/lib/catalog";

export default function HomePage() {
  return (
    <>
      {/* CATÁLOGO DIRECTO */}
      <section className='bg-lc-blanco py-8 sm:py-12'>
        <Container>
          <div className='max-w-2xl'>
            <div className='flex items-center gap-2'>
              <p className='flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-lc-morado sm:text-xs'>
                <IconSparkles className='h-3 w-3 text-lc-rosa' />
                Nueva colección
              </p>
            </div>

            <h1 className='mt-4 text-4xl font-bold leading-none tracking-tight sm:text-5xl'>
              <span className='text-lc-morado'>Lara</span>
              <span className='text-lc-rosa'>Shoping</span>
            </h1>

            <p className='mt-3 text-sm font-semibold text-lc-morado sm:text-base'>
              {tienda.eslogan}
            </p>

            <p className='mt-2 max-w-lg text-xs leading-relaxed text-black/55 sm:text-sm'>
              {tienda.descripcion}. Elige tus prendas, añádelas al carrito y
              solicita tu reserva por WhatsApp.
            </p>

            <ul className='mt-4 flex flex-wrap gap-2 text-[10px] font-semibold text-black/55 sm:text-[11px]'>
              <li className='inline-flex items-center gap-1 rounded-full border border-lc-morado/10 bg-white px-2.5 py-1'>
                <IconCheck className='h-3 w-3 text-lc-morado' />
                Reserva por WhatsApp
              </li>
              <li className='inline-flex items-center gap-1 rounded-full border border-lc-morado/10 bg-white px-2.5 py-1'>
                <IconRuler className='h-3 w-3 text-lc-rosa' />
                Talla única · XS a M
              </li>
              <li className='inline-flex items-center gap-1 rounded-full border border-lc-morado/10 bg-white px-2.5 py-1'>
                <IconSparkles className='h-3 w-3 text-lc-morado' />
                Mujer, hombre y niños
              </li>
            </ul>
          </div>

          <div className='mt-7'>
            <CatalogView />
          </div>
        </Container>
      </section>

      {/* CÓMO COMPRAR */}
      <section id='como-funciona' className='bg-lc-rosa/5 py-12 sm:py-16'>
        <Container>
          <Reveal>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
              <div>
                <p className='text-[10px] font-semibold uppercase tracking-[0.22em] text-lc-rosa'>
                  Sencillo y directo
                </p>
                <h2 className='mt-1.5 text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl'>
                  Cómo comprar por WhatsApp
                </h2>
              </div>
              <Link
                href='/carrito'
                className='inline-flex min-h-8 items-center gap-1.5 pb-0.5 text-sm font-semibold text-lc-morado transition-colors hover:text-lc-rosa'
              >
                Ver mi carrito
                <IconArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </Reveal>

          <div className='mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4'>
            {[
              {
                titulo: "1. Elige tus prendas",
                texto:
                  "Filtra por categoría y añade al carrito las prendas que te gusten.",
                icono: (
                  <svg
                    aria-hidden='true'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.7'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='h-4 w-4'
                  >
                    <path d='M9 3l3 2 3-2 5 3-2 4-2-1v11H8V9L6 10 4 6l5-3Z' />
                  </svg>
                ),
              },
              {
                titulo: "2. Revisa el carrito",
                texto:
                  "Comprueba las prendas, las cantidades y el total de tu pedido.",
                icono: (
                  <svg
                    aria-hidden='true'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.7'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='h-4 w-4'
                  >
                    <path d='M6 8h12l-1 12H7L6 8Z' />
                    <path d='M9 9V6a3 3 0 0 1 6 0v3' />
                  </svg>
                ),
              },
              {
                titulo: "3. Envía por WhatsApp",
                texto:
                  "Genera la solicitud de reserva y confírmala desde tu propia aplicación. El pago y el envío se acuerdan en el chat.",
                icono: (
                  <svg
                    aria-hidden='true'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-4 w-4'
                  >
                    <path d='M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14 0-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z' />
                  </svg>
                ),
              },
            ].map((paso, indice) => (
              <Reveal key={paso.titulo} delay={indice * 80}>
                <div className='flex h-full items-start gap-3 overflow-hidden rounded-xl bg-white p-4 shadow-sm ring-1 ring-lc-morado/5'>
                  <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lc-rosa/10 text-lc-rosa'>
                    {paso.icono}
                  </span>
                  <div className='min-w-0'>
                    <h3 className='text-sm font-semibold leading-snug'>
                      {paso.titulo}
                    </h3>
                    <p className='mt-1 text-xs leading-relaxed text-black/55'>
                      {paso.texto}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
