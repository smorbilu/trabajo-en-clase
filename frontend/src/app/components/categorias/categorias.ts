import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CategoriaDto } from '../../interfaces/categoriaDto';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categorias',
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
  templateUrl: './categorias.html',
  styleUrl: './categorias.css'
})
export class CategoriasComponent implements OnInit {
  categorias: CategoriaDto[] = [];
  cargando = true;
  error = '';
  editando = false;
  categoriaEditandoId: number | null = null;
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];

  formulario: CategoriaDto = {
    nombre: '',
    descripcion: ''
  };

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.cargando = true;
    this.error = '';

    this.categoryService.getCategorias().subscribe({
      next: (data: CategoriaDto[]) => {
        this.categorias = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las categorías';
        this.cargando = false;
      }
    });
  }

  guardarCategoria(): void {
    if (!this.formulario.nombre.trim()) {
      this.snackBar.open('El nombre es obligatorio', 'Cerrar', { duration: 2400 });
      return;
    }

    if (this.editando && this.categoriaEditandoId) {
      this.categoryService.updateCategoria(this.categoriaEditandoId, this.formulario).subscribe({
        next: () => {
          this.snackBar.open('Categoría actualizada correctamente', 'Cerrar', { duration: 2200 });
          this.resetFormulario();
          this.cargarCategorias();
        },
        error: () => {
          this.snackBar.open('Error al actualizar categoría', 'Cerrar', { duration: 2600 });
        }
      });
    } else {
      this.categoryService.createCategoria(this.formulario).subscribe({
        next: () => {
          this.snackBar.open('Categoría agregada correctamente', 'Cerrar', { duration: 2200 });
          this.resetFormulario();
          this.cargarCategorias();
        },
        error: () => {
          this.snackBar.open('Error al crear categoría', 'Cerrar', { duration: 2600 });
        }
      });
    }
  }

  editarCategoria(categoria: CategoriaDto): void {
    this.editando = true;
    this.categoriaEditandoId = categoria.id || null;
    this.formulario = {
      nombre: categoria.nombre,
      descripcion: categoria.descripcion || ''
    };
  }

  eliminarCategoria(id?: number): void {
    if (!id) return;

    const confirmar = confirm('¿Seguro que deseas eliminar esta categoría?');
    if (!confirmar) return;

    this.categoryService.deleteCategoria(id).subscribe({
      next: () => {
        this.snackBar.open('Categoría eliminada correctamente', 'Cerrar', { duration: 2200 });
        this.cargarCategorias();
      },
      error: () => {
        this.snackBar.open('No se pudo eliminar la categoría', 'Cerrar', { duration: 2600 });
      }
    });
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  resetFormulario(): void {
    this.editando = false;
    this.categoriaEditandoId = null;
    this.formulario = {
      nombre: '',
      descripcion: ''
    };
  }
}