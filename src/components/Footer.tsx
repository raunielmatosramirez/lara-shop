import Link from "next/link";
import { Container } from "@/components/Container";
import {
  IconBag,
  IconChat,
  IconHanger,
  IconHeart,
  IconHome,
  IconWhatsApp,
} from "@/components/Icons";
import { tienda } from "@/lib/catalog";
import { obtenerNumeroWhatsApp } from "@/lib/env";

export function Footer() {
  const numero = obtenerNumeroWhatsApp();
  const enlaceWhatsApp = numero ? `https://wa.me/${numero}` : "/carrito";
  const anio = new Date().getFullYear();

  const enlaces = [
    { href: "/", label: "Inicio", Icono: IconHome },
    { href: "/catalogo", label: "Catálogo", Icono: IconHanger },
    { href: "/carrito", label: "Mi carrito", Icono: IconBag },
    { href: "/#como-funciona", label: "Cómo comprar", Icono: IconChat },
  ];

  return (
    <footer className='mt-auto bg-lc-morado text-lc-blanco'>
      <div className='bg-gradient-to-b from-black/20 to-transparent'>
        <Container>
          <div className='grid grid-cols-1 gap-8 py-12 md:grid-cols-3 md:gap-12'>
            {/* Columna 1: Marca y descripción */}
            <div className='flex flex-col gap-4'>
              <Link href='/' className='flex items-center w-fit group'>
                {/* Icono redondeado */}
                <div className='relative z-0 flex h-12 w-12 items-center justify-center rounded-full bg-lc-rosa/15 transition-colors group-hover:bg-lc-rosa/25'>
                  <IconHanger className='h-6 w-6 text-lc-rosa' />
                </div>

                {/* Texto del logo superpuesto */}
                <span className='relative z-10 -ml-3 text-lg font-bold tracking-tight'>
                  <span className='text-white'>Lara</span>
                  <span className='text-lc-rosa'>Shoping</span>
                </span>
              </Link>
              <p className='text-sm leading-relaxed text-white/70 max-w-xs'>
                {tienda.descripcion}. {tienda.eslogan}
              </p>
            </div>

            {/* Columna 2: Enlaces de navegación */}
            <div>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-white/90 mb-4'>
                Navegación
              </h3>
              <nav
                aria-label='Navegación del pie'
                className='flex flex-col gap-3'
              >
                {enlaces.map((enlace) => (
                  <Link
                    key={enlace.href}
                    href={enlace.href}
                    className='group flex items-center gap-2.5 text-sm text-white/65 transition-colors hover:text-lc-rosa w-fit'
                  >
                    <enlace.Icono className='h-4 w-4 text-white/40 transition-colors group-hover:text-lc-rosa' />
                    {enlace.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Columna 3: Contacto y WhatsApp */}
            <div className='flex flex-col gap-4 md:items-end'>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-white/90 md:text-right'>
                ¿Tienes dudas?
              </h3>
              <p className='text-sm text-white/65 md:text-right'>
                Estamos aquí para ayudarte a elegir tu look perfecto.
              </p>
              <a
                href={enlaceWhatsApp}
                target={numero ? "_blank" : undefined}
                rel={numero ? "noopener noreferrer" : undefined}
                className='inline-flex min-h-[36px] w-fit items-center gap-1.5 rounded-full bg-lc-rosa px-4 text-xs font-semibold text-white shadow-md shadow-lc-rosa/20 transition-colors hover:bg-lc-rosa/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lc-rosa md:ml-auto'
              >
                <IconWhatsApp className='h-3.5 w-3.5' />
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>

          <div className='h-px w-full bg-white/10' />
        </Container>
      </div>
    </footer>
  );
}
