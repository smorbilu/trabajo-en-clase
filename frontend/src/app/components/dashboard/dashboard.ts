import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FakeAuthService } from '../../services/fake-auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  opciones = [
    { titulo: 'Inventario', descripcion: 'Gestiona productos', icono: 'inventory_2', ruta: '/inventario', color: 'inventario' },
    { titulo: 'Perfil', descripcion: 'Mi información', icono: 'account_circle', ruta: '/perfil_resumen', query: { origen: 'dashboard' }, color: 'perfil' },
    { titulo: 'Categorías', descripcion: 'Gestiona categorías', icono: 'sell', ruta: '/categorias', color: 'categorias' },
    { titulo: 'Proveedores', descripcion: 'Gestiona proveedores', icono: 'local_shipping', ruta: '/proveedores', color: 'proveedores' },
    { titulo: 'Movimientos', descripcion: 'Registra entradas y salidas', icono: 'receipt_long', ruta: '/movimientos-inventario', color: 'movimientos' },
    { titulo: 'My Friends', descripcion: 'Eventos en tiempo real desde PostgreSQL', icono: 'group', ruta: '/my-friends', color: 'myfriends' }
  ];

  constructor(
    private router: Router,
    private authService: FakeAuthService
  ) {}

  ir(opcion: any): void {
    if (opcion.query) {
      this.router.navigate([opcion.ruta], { queryParams: opcion.query });
    } else {
      this.router.navigate([opcion.ruta]);
    }
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('estaLogeado');
    localStorage.removeItem('perfilRecienCreado');
    this.router.navigate(['/login']);
  }
}