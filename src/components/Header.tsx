"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { useCart } from "@/components/CartProvider";
import {
  IconChat,
  IconClose,
  IconHanger,
  IconHome,
  IconBag,
  IconMenu,
} from "@/components/Icons";

const enlaces = [
  { href: "/", label: "Inicio", Icono: IconHome },
  { href: "/catalogo", label: "Catálogo", Icono: IconHanger },
  { href: "/#como-funciona", label: "Cómo comprar", Icono: IconChat },
];

function claseEnlace(activo: boolean): string {
  return `flex min-h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lc-morado ${
    activo
      ? "bg-lc-morado/8 text-lc-morado"
      : "text-lc-negro/60 hover:bg-lc-morado/5 hover:text-lc-morado"
  }`;
}

export function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const pathname = usePathname();
  const { totalItems, hydrated } = useCart();
  const botonMenuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuAbierto(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuAbierto) return;

    const cerrarConEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuAbierto(false);
        botonMenuRef.current?.focus();
      }
    };

    document.addEventListener("keydown", cerrarConEscape);
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [menuAbierto]);

  return (
    <header className='sticky top-0 z-50 bg-lc-blanco/95 text-lc-negro backdrop-blur-sm supports-[backdrop-filter]:bg-lc-blanco/80'>
      <Container>
        <div className='flex h-14 items-center justify-between gap-4 md:h-16'>
          {/* Logo */}
          <Link
            href='/'
            aria-label='LaraShop, ir al inicio'
            className='group flex min-h-9 flex-col justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lc-morado focus-visible:ring-offset-2 rounded-sm'
          >
            <span className='text-base font-bold tracking-tight sm:text-lg'>
              <span className='text-lc-morado'>Lara</span>
              <span className='text-lc-rosa'>Shoping</span>
            </span>
            <span className='mt-0.5 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-lc-rosa'>
              Moda para toda la familia
            </span>
          </Link>

          <div className='flex items-center gap-1 sm:gap-2'>
            {/* Navegación escritorio */}
            <nav
              className='hidden items-center gap-1 md:flex'
              aria-label='Navegación principal'
            >
              {enlaces.map((enlace) => (
                <Link
                  key={enlace.href}
                  href={enlace.href}
                  aria-current={pathname === enlace.href ? "page" : undefined}
                  className={claseEnlace(pathname === enlace.href)}
                >
                  <enlace.Icono className='h-3.5 w-3.5' />
                  {enlace.label}
                </Link>
              ))}
            </nav>

            {/* Separador vertical (escritorio) */}
            <span
              aria-hidden='true'
              className='hidden h-5 w-px bg-lc-negro/10 md:block'
            />

            {/* Carrito */}
            <Link
              href='/carrito'
              aria-label={
                totalItems > 0
                  ? `Carrito, ${totalItems} artículos`
                  : "Carrito, vacío"
              }
              className='relative flex h-9 w-9 items-center justify-center rounded-full text-lc-negro/70 transition-colors hover:bg-lc-morado/5 hover:text-lc-morado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lc-morado'
            >
              <IconBag className='h-5 w-5' />
              {hydrated && totalItems > 0 ? (
                <span className='absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-lc-rosa px-1 text-[10px] font-bold leading-none text-white'>
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              ) : null}
            </Link>

            {/* Botón menú móvil */}
            <button
              ref={botonMenuRef}
              type='button'
              onClick={() => setMenuAbierto((abierto) => !abierto)}
              aria-expanded={menuAbierto}
              aria-controls='menu-principal-movil'
              aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
              className='flex h-9 w-9 items-center justify-center rounded-full text-lc-negro/70 transition-colors hover:bg-lc-morado/5 hover:text-lc-morado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lc-morado md:hidden'
            >
              {menuAbierto ? (
                <IconClose className='h-5 w-5' />
              ) : (
                <IconMenu className='h-5 w-5' />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Menú móvil */}
      {menuAbierto ? (
        <div
          id='menu-principal-movil'
          className='bg-lc-blanco md:hidden'
        >
          <Container>
            <nav aria-label='Navegación móvil'>
              <ul className='flex flex-col py-2'>
                {enlaces.map((enlace) => (
                  <li key={enlace.href}>
                    <Link
                      href={enlace.href}
                      onClick={() => setMenuAbierto(false)}
                      className='flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-lc-negro/70 transition-colors hover:bg-lc-morado/5 hover:text-lc-morado'
                    >
                      <enlace.Icono className='h-4 w-4 text-lc-rosa' />
                      {enlace.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href='/carrito'
                    onClick={() => setMenuAbierto(false)}
                    className='flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-lc-negro/70 transition-colors hover:bg-lc-morado/5 hover:text-lc-morado'
                  >
                    <IconBag className='h-4 w-4 text-lc-rosa' />
                    Carrito{totalItems > 0 ? ` (${totalItems})` : ""}
                  </Link>
                </li>
              </ul>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
