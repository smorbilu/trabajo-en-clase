import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MovimientoInventarioService } from '../../services/movimiento-inventario.service';
import { MovimientoInventarioDto } from '../../interfaces/movimientoInventarioDto';
import { ProductService } from '../../services/product.service';
import { ProductoDto } from '../../interfaces/productoDto';
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
  selector: 'app-movimientos-inventario',
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
  templateUrl: './movimiento-inventario.html',
  styleUrl: './movimiento-inventario.css'
})
export class MovimientosInventarioComponent implements OnInit {
  movimientos: MovimientoInventarioDto[] = [];
  productos: ProductoDto[] = [];
  cargando = true;
  error = '';
  editando = false;
  movimientoEditandoId: number | null = null;
  displayedColumns: string[] = ['id', 'producto', 'tipo', 'cantidad', 'fecha', 'observacion', 'acciones'];

  formulario: MovimientoInventarioDto = {
    producto_id: 1,
    tipo_movimiento: 'entrada',
    cantidad: 1,
    fecha: '',
    observacion: ''
  };

  constructor(
    private movimientoService: MovimientoInventarioService,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarMovimientos();
    this.formulario.fecha = this.obtenerFechaHoy();
  }

  obtenerFechaHoy(): string {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  cargarProductos(): void {
    this.productService.getProductos().subscribe({
      next: (data: ProductoDto[]) => {
        this.productos = data;
        if (data.length > 0 && !this.editando) {
          this.formulario.producto_id = data[0].id || 1;
        }
      },
      error: () => {
        this.snackBar.open('Error al cargar productos', 'Cerrar', { duration: 2600 });
      }
    });
  }

  cargarMovimientos(): void {
    this.cargando = true;
    this.error = '';

    this.movimientoService.getMovimientos().subscribe({
      next: (data: MovimientoInventarioDto[]) => {
        this.movimientos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los movimientos';
        this.cargando = false;
      }
    });
  }

  guardarMovimiento(): void {
    if (!this.formulario.producto_id || this.formulario.cantidad <= 0 || !this.formulario.fecha) {
      this.snackBar.open('Completa los campos obligatorios correctamente', 'Cerrar', { duration: 2600 });
      return;
    }

    if (this.editando && this.movimientoEditandoId) {
      this.movimientoService.updateMovimiento(this.movimientoEditandoId, this.formulario).subscribe({
        next: () => {
          this.snackBar.open('Movimiento actualizado correctamente', 'Cerrar', { duration: 2200 });
          this.resetFormulario();
          this.cargarMovimientos();
        },
        error: () => {
          this.snackBar.open('Error al actualizar movimiento', 'Cerrar', { duration: 2600 });
        }
      });
    } else {
      this.movimientoService.createMovimiento(this.formulario).subscribe({
        next: () => {
          this.snackBar.open('Movimiento agregado correctamente', 'Cerrar', { duration: 2200 });
          this.resetFormulario();
          this.cargarMovimientos();
        },
        error: () => {
          this.snackBar.open('Error al crear movimiento', 'Cerrar', { duration: 2600 });
        }
      });
    }
  }

  editarMovimiento(movimiento: MovimientoInventarioDto): void {
    this.editando = true;
    this.movimientoEditandoId = movimiento.id || null;
    this.formulario = {
      producto_id: movimiento.producto_id,
      tipo_movimiento: movimiento.tipo_movimiento,
      cantidad: movimiento.cantidad,
      fecha: movimiento.fecha,
      observacion: movimiento.observacion || ''
    };
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  resetFormulario(): void {
    this.editando = false;
    this.movimientoEditandoId = null;
    this.formulario = {
      producto_id: this.productos.length > 0 ? this.productos[0].id || 1 : 1,
      tipo_movimiento: 'entrada',
      cantidad: 1,
      fecha: this.obtenerFechaHoy(),
      observacion: ''
    };
  }

  obtenerNombreProducto(movimiento: MovimientoInventarioDto): string {
    if (movimiento.producto?.nombre) {
      return movimiento.producto.nombre;
    }

    const producto = this.productos.find(p => p.id === movimiento.producto_id);
    return producto ? producto.nombre : `Producto ${movimiento.producto_id}`;
  }
}