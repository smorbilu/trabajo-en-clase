import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductoDto } from '../../interfaces/productoDto';
import { CategoriaDto } from '../../interfaces/categoriaDto';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css'
})
export class InventarioComponent implements OnInit {
  productos: ProductoDto[] = [];
  categorias: CategoriaDto[] = [];
  cargando = true;
  error = '';
  editando = false;
  productoEditandoId: number | null = null;
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'categoria', 'acciones'];

  formulario: ProductoDto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagen: '',
    categoria_id: 1
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarProductos();
  }

  cargarCategorias(): void {
    this.categoryService.getCategorias().subscribe({
      next: (data: CategoriaDto[]) => {
        this.categorias = data;
        if (data.length > 0 && !this.editando) {
          this.formulario.categoria_id = data[0].id || 1;
        }
      },
      error: () => {
        this.snackBar.open('Error al cargar categorías', 'Cerrar', { duration: 2600 });
      }
    });
  }

  cargarProductos(): void {
    this.cargando = true;
    this.error = '';

    this.productService.getProductos().subscribe({
      next: (data: ProductoDto[]) => {
        this.productos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los productos';
        this.cargando = false;
      }
    });
  }

  guardarProducto(): void {
    if (!this.formulario.nombre.trim()) {
      this.snackBar.open('El nombre es obligatorio', 'Cerrar', { duration: 2400 });
      return;
    }

    const payload: ProductoDto = {
      ...this.formulario,
      imagen: this.formulario.imagen || ''
    };

    if (this.editando && this.productoEditandoId) {
      this.productService.updateProducto(this.productoEditandoId, payload).subscribe({
        next: () => {
          this.snackBar.open('Producto actualizado correctamente', 'Cerrar', { duration: 2200 });
          this.resetFormulario();
          this.cargarProductos();
        },
        error: () => {
          this.snackBar.open('Error al actualizar producto', 'Cerrar', { duration: 2600 });
        }
      });
    } else {
      this.productService.createProducto(payload).subscribe({
        next: () => {
          this.snackBar.open('Producto agregado correctamente', 'Cerrar', { duration: 2200 });
          this.resetFormulario();
          this.cargarProductos();
        },
        error: () => {
          this.snackBar.open('Error al crear producto', 'Cerrar', { duration: 2600 });
        }
      });
    }
  }

  editarProducto(producto: ProductoDto): void {
    this.editando = true;
    this.productoEditandoId = producto.id || null;
    this.formulario = {
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: producto.precio,
      stock: producto.stock,
      imagen: producto.imagen || '',
      categoria_id: producto.categoria_id
    };
  }

  eliminarProducto(id?: number): void {
    if (!id) return;

    const confirmar = confirm('¿Seguro que deseas eliminar este producto?');
    if (!confirmar) return;

    this.productService.deleteProducto(id).subscribe({
      next: () => {
        this.snackBar.open('Producto eliminado correctamente', 'Cerrar', { duration: 2200 });
        this.cargarProductos();
      },
      error: () => {
        this.snackBar.open('No se pudo eliminar el producto', 'Cerrar', { duration: 2600 });
      }
    });
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  resetFormulario(): void {
    this.editando = false;
    this.productoEditandoId = null;
    this.formulario = {
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagen: '',
      categoria_id: this.categorias.length > 0 ? this.categorias[0].id || 1 : 1
    };
  }

  obtenerNombreCategoria(categoriaId: number): string {
    const categoria = this.categorias.find(c => c.id === categoriaId);
    return categoria ? categoria.nombre : `Categoría ${categoriaId}`;
  }
}