import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProveedorDto } from '../interfaces/proveedorDto';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/proveedores';

  getProveedores(): Observable<ProveedorDto[]> {
    return this.http.get<ProveedorDto[]>(this.apiUrl);
  }

  getProveedorById(id: number): Observable<ProveedorDto> {
    return this.http.get<ProveedorDto>(`${this.apiUrl}/${id}`);
  }

  createProveedor(proveedor: ProveedorDto): Observable<ProveedorDto> {
    return this.http.post<ProveedorDto>(this.apiUrl, proveedor);
  }

  updateProveedor(id: number, proveedor: ProveedorDto): Observable<ProveedorDto> {
    return this.http.put<ProveedorDto>(`${this.apiUrl}/${id}`, proveedor);
  }

  deleteProveedor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  toggleProveedor(id: number): Observable<ProveedorDto> {
    return this.http.patch<ProveedorDto>(`${this.apiUrl}/${id}/toggle`, {});
  }
}