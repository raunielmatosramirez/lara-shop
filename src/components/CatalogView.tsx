"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  IconArrowRight,
  IconGrid,
  IconoCategoria,
} from "@/components/Icons";
import {
  categorias,
  contarProductosPorCategoria,
  getProductosDestacados,
  productos,
} from "@/lib/catalog";

const TODAS = "todas";
const DESTACADOS = "destacados";

export function CatalogView() {
  const [categoriaActiva, setCategoriaActiva] = useState(TODAS);

  useEffect(() => {
    const aplicarHash = () => {
      const hash = window.location.hash.replace("#", "");

      if (
        hash === DESTACADOS ||
        categorias.some((item) => item.id === hash)
      ) {
        setCategoriaActiva(hash);
        return;
      }

      setCategoriaActiva(TODAS);
    };

    aplicarHash();
    window.addEventListener("hashchange", aplicarHash);

    return () => window.removeEventListener("hashchange", aplicarHash);
  }, []);

  function actualizarUrl(hash?: string) {
    const url = hash
      ? `${window.location.pathname}#${hash}`
      : window.location.pathname;

    window.history.replaceState(null, "", url);
  }

  function seleccionarCategoria(categoriaId: string) {
    setCategoriaActiva(categoriaId);
    actualizarUrl(categoriaId === TODAS ? undefined : categoriaId);
  }

  const productosFiltrados = useMemo(() => {
    if (categoriaActiva === TODAS) {
      return productos;
    }

    if (categoriaActiva === DESTACADOS) {
      return getProductosDestacados();
    }

    return productos.filter(
      (producto) => producto.categoria === categoriaActiva,
    );
  }, [categoriaActiva]);

  const filtros = [
    { id: TODAS, nombre: "Todas", total: productos.length },
    {
      id: DESTACADOS,
      nombre: "Destacados",
      total: getProductosDestacados().length,
    },
    ...categorias.map((categoria) => ({
      id: categoria.id,
      nombre: categoria.nombre,
      total: contarProductosPorCategoria(categoria.id),
    })),
  ];

  return (
    <div>
      {/* Filtros en píldoras */}
      <div
        role='group'
        aria-label='Filtrar productos por categoría'
        className='-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0'
      >
        {filtros.map((filtro) => {
          const activo = categoriaActiva === filtro.id;
          return (
            <button
              key={filtro.id}
              type='button'
              aria-pressed={activo}
              onClick={() => seleccionarCategoria(filtro.id)}
              className={`inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors ${
                activo
                  ? "border-lc-morado bg-lc-morado text-white"
                  : "border-black/10 bg-white text-lc-negro hover:border-lc-morado hover:text-lc-morado"
              }`}
            >
              <IconoCategoria
                id={filtro.id}
                className={`h-3.5 w-3.5 ${
                  activo ? "text-white/80" : "text-lc-rosa"
                }`}
              />
              {filtro.nombre}
              <span
                className={`text-[10px] font-medium ${
                  activo ? "text-white/70" : "text-black/45"
                }`}
              >
                {filtro.total}
              </span>
            </button>
          );
        })}
      </div>

      {/* Contador */}
      <div className='relative mt-4 flex items-center justify-between pb-2'>
        <p className='text-[11px] text-black/50' aria-live='polite'>
          {productosFiltrados.length}{" "}
          {productosFiltrados.length === 1 ? "producto" : "productos"}
          {categoriaActiva === DESTACADOS ? " · Destacados" : ""}
        </p>
        {categoriaActiva !== TODAS ? (
          <button
            type='button'
            onClick={() => seleccionarCategoria(TODAS)}
            className='inline-flex items-center gap-1 text-[11px] font-semibold text-lc-morado transition-colors hover:text-lc-rosa'
          >
            <IconGrid className='h-3 w-3' />
            Ver todas
            <IconArrowRight className='h-3 w-3' />
          </button>
        ) : null}
      </div>

      {/* Grid de productos */}
      {productosFiltrados.length === 0 ? (
        <p className='mt-8 text-center text-sm text-black/50'>
          No hay productos en esta categoría todavía.
        </p>
      ) : (
        <div className='mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {productosFiltrados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}
