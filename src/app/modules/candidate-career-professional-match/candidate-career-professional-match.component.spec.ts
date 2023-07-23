import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCareerProfessionalMatchComponent } from './candidate-career-professional-match.component';

describe('CandidateCareerProfessionalMatchComponent', () => {
  let component: CandidateCareerProfessionalMatchComponent;
  let fixture: ComponentFixture<CandidateCareerProfessionalMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateCareerProfessionalMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateCareerProfessionalMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
