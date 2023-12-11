import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoFiltroComponent } from './turno-filtro.component';

describe('TurnoFiltroComponent', () => {
  let component: TurnoFiltroComponent;
  let fixture: ComponentFixture<TurnoFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoFiltroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
