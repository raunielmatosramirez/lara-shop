"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IconMapPin, IconTruck } from "@/components/Icons";
import { mensajeria, tienda } from "@/lib/catalog";
import {
  obtenerCoordenadasRecogida,
  obtenerDireccionRecogida,
} from "@/lib/env";
import { EVENTO_ABRIR_RECOGIDA, EVENTO_ABRIR_TARIFAS } from "@/lib/events";
import { formatearPrecioEntero } from "@/lib/format";

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function ShippingRates() {
  const [abierto, setAbierto] = useState(false);
  const [recogidaAbierta, setRecogidaAbierta] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const botonRef = useRef<HTMLButtonElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const botonRecogidaRef = useRef<HTMLButtonElement>(null);
  const cerrarRecogidaRef = useRef<HTMLButtonElement>(null);
  const direccionRecogida = obtenerDireccionRecogida();
  const coordenadasRecogida = obtenerCoordenadasRecogida();
  const hayRecogida = Boolean(direccionRecogida || coordenadasRecogida);
  const textoUbicacion =
    direccionRecogida ??
    (coordenadasRecogida
      ? `${coordenadasRecogida.lat}, ${coordenadasRecogida.lng}`
      : "");
  const consultaMapa = coordenadasRecogida
    ? `${coordenadasRecogida.lat},${coordenadasRecogida.lng}`
    : (direccionRecogida ?? "");

  useEffect(() => {
    const abrir = () => {
      setRecogidaAbierta(false);
      setAbierto(true);
    };

    const abrirMapa = () => {
      if (!hayRecogida) return;
      setAbierto(false);
      setBusqueda("");
      setRecogidaAbierta(true);
    };

    window.addEventListener(EVENTO_ABRIR_TARIFAS, abrir);
    window.addEventListener(EVENTO_ABRIR_RECOGIDA, abrirMapa);

    return () => {
      window.removeEventListener(EVENTO_ABRIR_TARIFAS, abrir);
      window.removeEventListener(EVENTO_ABRIR_RECOGIDA, abrirMapa);
    };
  }, [hayRecogida]);

  useEffect(() => {
    if (!abierto && !recogidaAbierta) return;

    if (abierto) {
      cerrarRef.current?.focus();
    } else {
      cerrarRecogidaRef.current?.focus();
    }

    const cerrarConEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (abierto) {
        setAbierto(false);
        setBusqueda("");
        botonRef.current?.focus();
      }

      if (recogidaAbierta) {
        setRecogidaAbierta(false);
        botonRecogidaRef.current?.focus();
      }
    };

    document.addEventListener("keydown", cerrarConEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", cerrarConEscape);
      document.body.style.overflow = "";
    };
  }, [abierto, recogidaAbierta]);

  function cerrar() {
    setAbierto(false);
    setBusqueda("");
    botonRef.current?.focus();
  }

  function cerrarRecogida() {
    setRecogidaAbierta(false);
    botonRecogidaRef.current?.focus();
  }

  const gruposFiltrados = useMemo(() => {
    const termino = normalizar(busqueda.trim());

    if (!termino) {
      return mensajeria.grupos;
    }

    return mensajeria.grupos
      .map((grupo) => {
        if (normalizar(grupo.nombre).includes(termino)) {
          return grupo;
        }

        return {
          ...grupo,
          tarifas: grupo.tarifas.filter((tarifa) =>
            normalizar(tarifa.zona).includes(termino),
          ),
        };
      })
      .filter(
        (grupo) =>
          grupo.tarifas.length > 0 ||
          normalizar(grupo.nombre).includes(termino),
      );
  }, [busqueda]);

  const mapaSrc = consultaMapa
    ? `https://www.google.com/maps?q=${encodeURIComponent(consultaMapa)}&z=16&output=embed`
    : null;
  const mapaEnlace = consultaMapa
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consultaMapa)}`
    : null;

  return (
    <>
      <div className='fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2'>
        <button
          ref={botonRef}
          type='button'
          onClick={() => {
            setRecogidaAbierta(false);
            setAbierto(true);
          }}
          aria-label='Ver tarifas de mensajería'
          title='Tarifas de mensajería'
          aria-haspopup='dialog'
          aria-expanded={abierto}
          className='flex h-12 w-12 items-center justify-center rounded-full bg-lc-morado text-white shadow-lg transition-colors hover:bg-lc-morado/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lc-rosa focus-visible:ring-offset-2'
        >
          <IconTruck className='h-5 w-5' />
        </button>

        {hayRecogida ? (
          <button
            ref={botonRecogidaRef}
            type='button'
            onClick={() => {
              setAbierto(false);
              setBusqueda("");
              setRecogidaAbierta(true);
            }}
            aria-label='Ver recogida en local'
            title='Recogida en local'
            aria-haspopup='dialog'
            aria-expanded={recogidaAbierta}
            className='flex h-12 w-12 items-center justify-center rounded-full bg-lc-rosa text-white shadow-lg transition-colors hover:bg-lc-rosa/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lc-morado focus-visible:ring-offset-2'
          >
            <IconMapPin className='h-5 w-5' />
          </button>
        ) : null}
      </div>

      {abierto ? (
        <div
          role='presentation'
          onClick={cerrar}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4'
        >
          <div
            role='dialog'
            aria-modal='true'
            aria-labelledby='tarifas-titulo'
            onClick={(event) => event.stopPropagation()}
            className='flex h-[70vh] max-h-[540px] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl'
          >
            <div className='p-5 sm:p-6'>
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <h2
                    id='tarifas-titulo'
                    className='text-base font-bold tracking-tight sm:text-lg'
                  >
                    {mensajeria.titulo}
                  </h2>
                  <p className='mt-1 text-[11px] leading-relaxed text-black/55 sm:text-xs'>
                    {tienda.nombre}. {mensajeria.descripcion}
                  </p>
                </div>
                <button
                  ref={cerrarRef}
                  type='button'
                  onClick={cerrar}
                  className='shrink-0 rounded-full bg-lc-morado/10 px-3 py-1.5 text-[11px] font-semibold text-lc-morado transition-colors hover:bg-lc-morado/15'
                >
                  X
                </button>
              </div>

              <input
                type='search'
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
                placeholder='Buscar zona...'
                aria-label='Buscar tarifa por zona'
                className='mt-4 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-lc-negro outline-none transition-colors placeholder:text-black/35 focus:border-lc-morado focus:ring-2 focus:ring-lc-rosa/40'
              />
            </div>

            <div className='min-h-0 flex-1 overflow-y-auto px-5 pb-5 sm:px-6 sm:pb-6'>
              {gruposFiltrados.length === 0 ? (
                <p className='py-8 text-center text-xs text-black/50'>
                  No se encontraron zonas para «{busqueda.trim()}».
                </p>
              ) : (
                <div className='space-y-5'>
                  {gruposFiltrados.map((grupo) => (
                    <section key={grupo.nombre}>
                      <h3 className='text-xs font-bold text-lc-rosa'>
                        {grupo.nombre}
                      </h3>
                      {grupo.nota ? (
                        <p className='mt-1 text-[10px] leading-relaxed text-black/55'>
                          {grupo.nota}
                        </p>
                      ) : null}
                      {grupo.tarifas.length > 0 ? (
                        <ul className='mt-2 space-y-1.5'>
                          {grupo.tarifas.map((tarifa) => (
                            <li
                              key={tarifa.zona}
                              className='flex items-center justify-between gap-2 rounded-lg bg-lc-morado/5 px-3 py-2'
                            >
                              <span className='text-[11px] font-medium'>
                                {tarifa.zona}
                              </span>
                              <span className='shrink-0 text-[11px] font-bold text-lc-morado'>
                                {tarifa.precio === null
                                  ? "A convenir"
                                  : formatearPrecioEntero(
                                      tarifa.precio,
                                      tienda.simboloMoneda,
                                    )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>
              )}

              <p className='mt-4 text-[10px] leading-relaxed text-black/50'>
                {mensajeria.nota}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {recogidaAbierta && hayRecogida && mapaSrc && mapaEnlace ? (
        <div
          role='presentation'
          onClick={cerrarRecogida}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4'
        >
          <div
            role='dialog'
            aria-modal='true'
            aria-labelledby='recogida-titulo'
            onClick={(event) => event.stopPropagation()}
            className='w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl'
          >
            <div className='flex items-start justify-between gap-3 p-5 sm:p-6'>
              <div>
                <h2
                  id='recogida-titulo'
                  className='text-base font-bold tracking-tight sm:text-lg'
                >
                  Recogida en local
                </h2>
                <p className='mt-1 text-[11px] leading-relaxed text-black/55 sm:text-xs'>
                  {textoUbicacion}
                </p>
              </div>
              <button
                ref={cerrarRecogidaRef}
                type='button'
                onClick={cerrarRecogida}
                className='shrink-0 rounded-full bg-lc-morado/10 px-3 py-1.5 text-[11px] font-semibold text-lc-morado transition-colors hover:bg-lc-morado/15'
              >
                X
              </button>
            </div>

            <div className='px-5 pb-5 sm:px-6 sm:pb-6'>
              <iframe
                title={`Mapa de recogida en ${textoUbicacion}`}
                src={mapaSrc}
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                className='h-64 w-full rounded-xl border-0 sm:h-80'
              />

              <a
                href={mapaEnlace}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 flex min-h-10 w-full items-center justify-center rounded-full bg-lc-morado px-4 text-sm font-semibold text-white transition-colors hover:bg-lc-morado/90'
              >
                Abrir en Google Maps
              </a>

              <p className='mt-2 text-center text-[10px] leading-relaxed text-black/45'>
                Coordina la recogida por WhatsApp antes de pasar.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
