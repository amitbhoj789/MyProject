import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerProfessionalServicesComponent } from './career-professional-services.component';

describe('CareerProfessionalServicesComponent', () => {
  let component: CareerProfessionalServicesComponent;
  let fixture: ComponentFixture<CareerProfessionalServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerProfessionalServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerProfessionalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
