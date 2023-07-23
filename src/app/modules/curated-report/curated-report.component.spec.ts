import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratedReportComponent } from './curated-report.component';

describe('CuratedReportComponent', () => {
  let component: CuratedReportComponent;
  let fixture: ComponentFixture<CuratedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuratedReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuratedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
