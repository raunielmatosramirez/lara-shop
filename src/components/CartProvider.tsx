"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProducto } from "@/lib/catalog";
import type { CartItem } from "@/lib/types";

const STORAGE_KEY = "larashoping-carrito-v1";
const CANTIDAD_MAXIMA = 99;

interface CartContextValue {
  items: CartItem[];
  hydrated: boolean;
  totalItems: number;
  addItem: (productoId: string, cantidad?: number) => void;
  actualizarCantidad: (productoId: string, cantidad: number) => void;
  eliminarItem: (productoId: string) => void;
  vaciarCarrito: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function normalizarCantidad(valor: unknown): number {
  if (typeof valor !== "number" || !Number.isFinite(valor)) {
    return 1;
  }
  return Math.min(CANTIDAD_MAXIMA, Math.max(1, Math.floor(valor)));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Rehidratar desde localStorage (ignora variantes antiguas de talla/color).
  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        const parseado: unknown = JSON.parse(guardado);
        if (Array.isArray(parseado)) {
          const validos = parseado.flatMap((item): CartItem[] => {
            if (!item || typeof item !== "object") return [];
            const candidato = item as Record<string, unknown>;

            if (
              typeof candidato.productoId !== "string" ||
              typeof candidato.cantidad !== "number" ||
              candidato.cantidad <= 0 ||
              !getProducto(candidato.productoId)
            ) {
              return [];
            }

            return [
              {
                productoId: candidato.productoId,
                cantidad: normalizarCantidad(candidato.cantidad),
              },
            ];
          });

          const unicos = new Map<string, CartItem>();
          for (const item of validos) {
            const existente = unicos.get(item.productoId);
            if (existente) {
              existente.cantidad = Math.min(
                CANTIDAD_MAXIMA,
                existente.cantidad + item.cantidad,
              );
            } else {
              unicos.set(item.productoId, item);
            }
          }

          setItems([...unicos.values()]);
        }
      }
    } catch (error) {
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persistir cambios
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {}
  }, [items, hydrated]);

  const addItem = useCallback((productoId: string, cantidad = 1) => {
    if (!getProducto(productoId)) return;

    const cantidadAgregada = normalizarCantidad(cantidad);

    setItems((anteriores) => {
      const indice = anteriores.findIndex(
        (item) => item.productoId === productoId,
      );

      if (indice >= 0) {
        const siguientes = anteriores.slice();
        siguientes[indice] = {
          ...siguientes[indice],
          cantidad: Math.min(
            CANTIDAD_MAXIMA,
            siguientes[indice].cantidad + cantidadAgregada,
          ),
        };
        return siguientes;
      }

      return [...anteriores, { productoId, cantidad: cantidadAgregada }];
    });
  }, []);

  const actualizarCantidad = useCallback(
    (productoId: string, cantidad: number) => {
      setItems((anteriores) =>
        anteriores.map((item) =>
          item.productoId === productoId
            ? { ...item, cantidad: normalizarCantidad(cantidad) }
            : item,
        ),
      );
    },
    [],
  );

  const eliminarItem = useCallback((productoId: string) => {
    setItems((anteriores) =>
      anteriores.filter((item) => item.productoId !== productoId),
    );
  }, []);

  const vaciarCarrito = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.cantidad, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      hydrated,
      totalItems,
      addItem,
      actualizarCantidad,
      eliminarItem,
      vaciarCarrito,
    }),
    [
      items,
      hydrated,
      totalItems,
      addItem,
      actualizarCantidad,
      eliminarItem,
      vaciarCarrito,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const contexto = useContext(CartContext);
  if (!contexto) {
    throw new Error("useCart debe usarse dentro de CartProvider.");
  }
  return contexto;
}
