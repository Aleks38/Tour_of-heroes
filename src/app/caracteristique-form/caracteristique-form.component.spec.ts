import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristiqueFormComponent } from './caracteristique-form.component';

describe('CaracteristiqueFormComponent', () => {
  let component: CaracteristiqueFormComponent;
  let fixture: ComponentFixture<CaracteristiqueFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaracteristiqueFormComponent]
    });
    fixture = TestBed.createComponent(CaracteristiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
