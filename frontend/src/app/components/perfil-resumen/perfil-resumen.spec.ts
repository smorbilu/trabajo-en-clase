import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilResumenComponent } from './perfil-resumen';

describe('PerfilResumen', () => {
  let component: PerfilResumenComponent;
  let fixture: ComponentFixture<PerfilResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilResumenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilResumenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
