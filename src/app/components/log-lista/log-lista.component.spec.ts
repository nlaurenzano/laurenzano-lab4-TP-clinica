import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogListaComponent } from './log-lista.component';

describe('LogListaComponent', () => {
  let component: LogListaComponent;
  let fixture: ComponentFixture<LogListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
