import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-perfil-resumen',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './perfil-resumen.html',
  styleUrl: './perfil-resumen.css'
})
export class PerfilResumenComponent implements OnInit {
  desdeDashboard = false;
  usuario: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.desdeDashboard = params['origen'] === 'dashboard';
      this.cargarPerfil();
    });
  }

  cargarPerfil(): void {
    const perfilRecienCreado = this.leerStorage('perfilRecienCreado');
    const usuarioGuardado = this.leerStorage('usuario');

    if (usuarioGuardado && perfilRecienCreado && this.esMismoUsuario(usuarioGuardado, perfilRecienCreado)) {
      this.usuario = {
        ...perfilRecienCreado,
        ...usuarioGuardado
      };
      return;
    }

    this.usuario = usuarioGuardado || perfilRecienCreado || null;
  }

  leerStorage(clave: string): any | null {
    const valor = localStorage.getItem(clave);
    if (!valor) return null;

    try {
      return JSON.parse(valor);
    } catch {
      return null;
    }
  }

  esMismoUsuario(a: any, b: any): boolean {
    if (!a || !b) return false;

    if (a.usuario && b.usuario && a.usuario === b.usuario) return true;
    if (a.email && b.email && a.email === b.email) return true;

    return false;
  }

  obtenerFoto(): string {
    if (!this.usuario?.foto) {
      return '';
    }

    if (this.usuario.foto.startsWith('data:image')) {
      return this.usuario.foto;
    }

    return `data:image/png;base64,${this.usuario.foto}`;
  }
}