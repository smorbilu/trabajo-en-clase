import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { PerfilResumenComponent } from './components/perfil-resumen/perfil-resumen';
import { InventarioComponent } from './components/inventario/inventario';
import { CategoriasComponent } from './components/categorias/categorias';
import { ProveedoresComponent } from './components/proveedor/proveedor';
import { MovimientosInventarioComponent } from './components/movimiento-inventario/movimiento-inventario';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'perfil_resumen', component: PerfilResumenComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'inventario', component: InventarioComponent, canActivate: [authGuard] },
  { path: 'categorias', component: CategoriasComponent, canActivate: [authGuard] },
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [authGuard] },
  { path: 'movimientos-inventario', component: MovimientosInventarioComponent, canActivate: [authGuard] }
];