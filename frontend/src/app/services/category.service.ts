import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaDto } from '../interfaces/categoriaDto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/categorias';

  getCategorias(): Observable<CategoriaDto[]> {
    return this.http.get<CategoriaDto[]>(this.apiUrl);
  }

  getCategoriaById(id: number): Observable<CategoriaDto> {
    return this.http.get<CategoriaDto>(`${this.apiUrl}/${id}`);
  }

  createCategoria(categoria: CategoriaDto): Observable<CategoriaDto> {
    return this.http.post<CategoriaDto>(this.apiUrl, categoria);
  }

  updateCategoria(id: number, categoria: CategoriaDto): Observable<CategoriaDto> {
    return this.http.put<CategoriaDto>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}