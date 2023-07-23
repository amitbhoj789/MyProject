import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerProfessionalTopMatchComponent } from './career-professional-top-match.component';

describe('CareerProfessionalTopMatchComponent', () => {
  let component: CareerProfessionalTopMatchComponent;
  let fixture: ComponentFixture<CareerProfessionalTopMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerProfessionalTopMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerProfessionalTopMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
