import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobrepsProfileDetailsComponent } from './jobreps-profile-details.component';

describe('JobrepsProfileDetailsComponent', () => {
  let component: JobrepsProfileDetailsComponent;
  let fixture: ComponentFixture<JobrepsProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobrepsProfileDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobrepsProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
