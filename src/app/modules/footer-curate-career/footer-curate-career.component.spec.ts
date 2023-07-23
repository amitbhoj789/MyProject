import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCurateCareerComponent } from './footer-curate-career.component';

describe('FooterCurateCareerComponent', () => {
  let component: FooterCurateCareerComponent;
  let fixture: ComponentFixture<FooterCurateCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterCurateCareerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterCurateCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
