import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { ProveedorDto } from '../../interfaces/proveedorDto';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './proveedor.html',
  styleUrl: './proveedor.css'
})
export class ProveedoresComponent implements OnInit {
  proveedores: ProveedorDto[] = [];
  cargando = true;
  error = '';
  editando = false;
  proveedorEditandoId: number | null = null;
  displayedColumns: string[] = ['id', 'nombre', 'telefono', 'direccion', 'correo', 'estado', 'acciones'];

  formulario: ProveedorDto = {
    nombre: '',
    telefono: '',
    direccion: '',
    correo: '',
    activo: true
  };

  constructor(
    private proveedorService: ProveedorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarProveedores();
  }

  esActivo(valor: any): boolean {
    return valor === true || valor === 1 || valor === '1';
  }

  cargarProveedores(): void {
    this.cargando = true;
    this.error = '';

    this.proveedorService.getProveedores().subscribe({
      next: (data: ProveedorDto[]) => {
        this.proveedores = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los proveedores';
        this.cargando = false;
      }
    });
  }

  guardarProveedor(): void {
    if (!this.formulario.nombre.trim()) {
      this.snackBar.open('El nombre es obligatorio', 'Cerrar', { duration: 2400 });
      return;
    }

    if (this.editando && this.proveedorEditandoId) {
      this.proveedorService.updateProveedor(this.proveedorEditandoId, this.formulario).subscribe({
        next: () => {
          this.snackBar.open('Proveedor actualizado correctamente', 'Cerrar', { duration: 2200 });
          this.resetFormulario();
          this.cargarProveedores();
        },
        error: () => {
          this.snackBar.open('Error al actualizar proveedor', 'Cerrar', { duration: 2600 });
        }
      });
    } else {
      this.proveedorService.createProveedor(this.formulario).subscribe({
        next: () => {
          this.snackBar.open('Proveedor agregado correctamente', 'Cerrar', { duration: 2200 });
          this.resetFormulario();
          this.cargarProveedores();
        },
        error: () => {
          this.snackBar.open('Error al crear proveedor', 'Cerrar', { duration: 2600 });
        }
      });
    }
  }

  editarProveedor(proveedor: ProveedorDto): void {
    this.editando = true;
    this.proveedorEditandoId = proveedor.id || null;
    this.formulario = {
      nombre: proveedor.nombre,
      telefono: proveedor.telefono || '',
      direccion: proveedor.direccion || '',
      correo: proveedor.correo || '',
      activo: this.esActivo(proveedor.activo)
    };
  }

  eliminarProveedor(id?: number): void {
    if (!id) return;

    const confirmar = confirm('¿Seguro que deseas eliminar este proveedor?');
    if (!confirmar) return;

    this.proveedorService.deleteProveedor(id).subscribe({
      next: () => {
        this.snackBar.open('Proveedor eliminado correctamente', 'Cerrar', { duration: 2200 });
        this.cargarProveedores();
      },
      error: () => {
        this.snackBar.open('No se pudo eliminar el proveedor', 'Cerrar', { duration: 2600 });
      }
    });
  }

  cambiarEstado(id?: number): void {
    if (!id) return;

    this.proveedorService.toggleProveedor(id).subscribe({
      next: () => {
        this.snackBar.open('Estado actualizado', 'Cerrar', { duration: 2200 });
        this.cargarProveedores();
      },
      error: () => {
        this.snackBar.open('No se pudo cambiar el estado', 'Cerrar', { duration: 2600 });
      }
    });
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  resetFormulario(): void {
    this.editando = false;
    this.proveedorEditandoId = null;
    this.formulario = {
      nombre: '',
      telefono: '',
      direccion: '',
      correo: '',
      activo: true
    };
  }
}