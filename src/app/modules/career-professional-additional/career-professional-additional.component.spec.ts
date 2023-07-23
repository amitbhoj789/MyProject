import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerProfessionalAdditionalComponent } from './career-professional-additional.component';

describe('CareerProfessionalAdditionalComponent', () => {
  let component: CareerProfessionalAdditionalComponent;
  let fixture: ComponentFixture<CareerProfessionalAdditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerProfessionalAdditionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerProfessionalAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
