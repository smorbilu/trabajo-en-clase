import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoInventario } from './movimiento-inventario';

describe('MovimientoInventario', () => {
  let component: MovimientoInventario;
  let fixture: ComponentFixture<MovimientoInventario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientoInventario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientoInventario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
