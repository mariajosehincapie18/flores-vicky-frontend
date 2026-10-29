
export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  imagen?: string | null;
  descripcion?: string | null;
  caracteristicas?: string[] | string | null;
}
