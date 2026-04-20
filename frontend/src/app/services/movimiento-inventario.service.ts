import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovimientoInventarioDto } from '../interfaces/movimientoInventarioDto';

@Injectable({
  providedIn: 'root'
})
export class MovimientoInventarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/movimientos-inventario';

  getMovimientos(): Observable<MovimientoInventarioDto[]> {
    return this.http.get<MovimientoInventarioDto[]>(this.apiUrl);
  }

  getMovimientoById(id: number): Observable<MovimientoInventarioDto> {
    return this.http.get<MovimientoInventarioDto>(`${this.apiUrl}/${id}`);
  }

  createMovimiento(movimiento: MovimientoInventarioDto): Observable<MovimientoInventarioDto> {
    return this.http.post<MovimientoInventarioDto>(this.apiUrl, movimiento);
  }

  updateMovimiento(id: number, movimiento: MovimientoInventarioDto): Observable<MovimientoInventarioDto> {
    return this.http.put<MovimientoInventarioDto>(`${this.apiUrl}/${id}`, movimiento);
  }
}