export interface ProductoDto {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagen?: string;
  categoria_id: number;
}