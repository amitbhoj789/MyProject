import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerTabComponent } from './job-seeker-tab.component';

describe('JobSeekerTabComponent', () => {
  let component: JobSeekerTabComponent;
  let fixture: ComponentFixture<JobSeekerTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobSeekerTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
