import config from "../../src/data/config.json";
import type {
  Categoria,
  ConfiguracionTienda,
  Mensajeria,
  Producto,
  Tienda,
} from "@/lib/types";

const data = config as ConfiguracionTienda;

export const tienda: Tienda = data.tienda;
export const mensajeria: Mensajeria = data.mensajeria;
export const categorias: Categoria[] = data.categorias;
// Solo se muestran los productos activos (activo !== false).
export const productos: Producto[] = data.productos.filter(
  (producto) => producto.activo !== false,
);

export function getProducto(id: string): Producto | undefined {
  return productos.find((p) => p.id === id);
}

export function getCategoria(id: string): Categoria | undefined {
  return categorias.find((c) => c.id === id);
}

export function getProductosPorCategoria(categoriaId: string): Producto[] {
  return productos.filter((p) => p.categoria === categoriaId);
}

export function getProductosDestacados(): Producto[] {
  return productos.filter((p) => p.destacado);
}

export function contarProductosPorCategoria(categoriaId: string): number {
  return getProductosPorCategoria(categoriaId).length;
}
