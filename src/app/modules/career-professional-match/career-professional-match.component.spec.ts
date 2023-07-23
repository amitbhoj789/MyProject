import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerProfessionalMatchComponent } from './career-professional-match.component';

describe('CareerProfessionalMatchComponent', () => {
  let component: CareerProfessionalMatchComponent;
  let fixture: ComponentFixture<CareerProfessionalMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerProfessionalMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerProfessionalMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
