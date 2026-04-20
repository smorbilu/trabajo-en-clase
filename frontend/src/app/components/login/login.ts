import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FakeAuthService } from '../../services/fake-auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  ocultarPassword = true;
  cargando = false;

  constructor(
    private fakeAuthService: FakeAuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(): void {
    if (!this.username || !this.password) {
      this.snackBar.open('Completa usuario y contraseña', 'Cerrar', { duration: 2500 });
      return;
    }

    this.cargando = true;

    this.fakeAuthService.login(this.username, this.password).subscribe({
      next: (respuesta) => {
        if (respuesta?.token) {
          localStorage.setItem('token', respuesta.token);
          localStorage.setItem('estaLogeado', 'true');
        }

        if (respuesta?.usuario) {
          const perfilRecienCreadoTexto = localStorage.getItem('perfilRecienCreado');
          let usuarioFinal = respuesta.usuario;

          if (perfilRecienCreadoTexto) {
            try {
              const perfilRecienCreado = JSON.parse(perfilRecienCreadoTexto);

              const mismoUsuario =
                (perfilRecienCreado?.usuario &&
                  perfilRecienCreado.usuario === respuesta.usuario.usuario) ||
                (perfilRecienCreado?.email &&
                  perfilRecienCreado.email === respuesta.usuario.email);

              if (mismoUsuario) {
                usuarioFinal = {
                  ...perfilRecienCreado,
                  ...respuesta.usuario
                };
              } else {
                localStorage.removeItem('perfilRecienCreado');
              }
            } catch {
              localStorage.removeItem('perfilRecienCreado');
            }
          }

          localStorage.setItem('usuario', JSON.stringify(usuarioFinal));
        }

        this.cargando = false;
        this.snackBar.open('Inicio de sesión correcto', 'Cerrar', { duration: 2200 });
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.cargando = false;
        this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', { duration: 3000 });
      }
    });
  }
}