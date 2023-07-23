import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobrepsExpertiseComponent } from './jobreps-expertise.component';

describe('JobrepsExpertiseComponent', () => {
  let component: JobrepsExpertiseComponent;
  let fixture: ComponentFixture<JobrepsExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobrepsExpertiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobrepsExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
