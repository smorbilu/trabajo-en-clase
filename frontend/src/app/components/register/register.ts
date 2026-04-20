import { Component, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FakeAuthService } from '../../services/fake-auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  registroForm: FormGroup;
  previewFoto = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(FakeAuthService) private fakeAuthService: FakeAuthService
  ) {
    this.registroForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        usuario: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmarPassword: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        bio: ['', Validators.required],
        fecha_cumpleanios: ['', Validators.required],
        genero: ['', Validators.required],
        foto: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmarPassword = control.get('confirmarPassword')?.value;

    if (password && confirmarPassword && password !== confirmarPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  actualizarPreviewFoto(): void {
    const foto = this.registroForm.get('foto')?.value?.trim() || '';

    if (!foto) {
      this.previewFoto = '';
      return;
    }

    this.previewFoto = this.normalizarBase64(foto);
  }

  normalizarBase64(valor: string): string {
    const texto = valor.trim();

    if (!texto) return '';

    if (texto.startsWith('data:image/')) {
      return texto;
    }

    return `data:image/png;base64,${texto}`;
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.snackBar.open('Completa todos los campos correctamente', 'Cerrar', { duration: 2800 });
      this.registroForm.markAllAsTouched();
      return;
    }

    const formValue = this.registroForm.value;
    const fotoNormalizada = this.normalizarBase64(formValue.foto);

    const nuevoUsuario = {
      nombre: `${formValue.nombre} ${formValue.apellido}`.trim(),
      usuario: formValue.usuario,
      email: formValue.correo,
      password: formValue.password,
      foto: fotoNormalizada,
      direccion: formValue.direccion,
      telefono: formValue.telefono,
      bio: formValue.bio,
      fecha_cumpleanios: formValue.fecha_cumpleanios,
      genero: formValue.genero
    };

    this.fakeAuthService.registro(nuevoUsuario).subscribe({
      next: (entry: any) => {
        const perfilRecienCreado = {
          id: entry?.usuario?.id || null,
          nombre: formValue.nombre,
          apellido: formValue.apellido,
          usuario: formValue.usuario,
          email: formValue.correo,
          direccion: formValue.direccion,
          telefono: formValue.telefono,
          bio: formValue.bio,
          fecha_cumpleanios: formValue.fecha_cumpleanios,
          genero: formValue.genero,
          foto: fotoNormalizada
        };

        localStorage.setItem('perfilRecienCreado', JSON.stringify(perfilRecienCreado));
        this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 2200 });
        this.router.navigate(['/perfil_resumen']);
      },
      error: (err: any) => {
        const mensaje =
          err?.error?.mensaje ||
          err?.error?.error ||
          'Error al registrar usuario';
        this.snackBar.open(mensaje, 'Cerrar', { duration: 3200 });
      }
    });
  }
}