import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepJobJourneyComponent } from './step-job-journey.component';

describe('StepJobJourneyComponent', () => {
  let component: StepJobJourneyComponent;
  let fixture: ComponentFixture<StepJobJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepJobJourneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepJobJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
