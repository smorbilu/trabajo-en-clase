export interface MovimientoInventarioDto {
  id?: number;
  producto_id: number;
  tipo_movimiento: string;
  cantidad: number;
  fecha: string;
  observacion?: string;
  producto?: {
    id: number;
    nombre: string;
  };
}