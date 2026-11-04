export interface Tienda {
  nombre: string;
  descripcion: string;
  eslogan: string;
  whatsapp: string;
  hosting: string;
  moneda: string;
  simboloMoneda: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface TarifaMensajeria {
  zona: string;
  precio: number | null;
}

export interface GrupoMensajeria {
  nombre: string;
  tarifas: TarifaMensajeria[];
  nota?: string;
}

export interface Mensajeria {
  titulo: string;
  descripcion: string;
  grupos: GrupoMensajeria[];
  nota: string;
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagenes: string[];
  destacado: boolean;
  activo?: boolean;
}

export interface ConfiguracionTienda {
  tienda: Tienda;
  mensajeria: Mensajeria;
  categorias: Categoria[];
  productos: Producto[];
}

export interface CartItem {
  productoId: string;
  cantidad: number;
}

export interface LineaPedido {
  item: CartItem;
  producto: Producto;
  subtotal: number;
}
