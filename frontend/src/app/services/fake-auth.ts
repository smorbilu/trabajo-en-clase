import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeAuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  login(usuario: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      usuario,
      password
    });
  }

  registro(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, datos);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}