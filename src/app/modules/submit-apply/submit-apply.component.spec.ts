import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitApplyComponent } from './submit-apply.component';

describe('SubmitApplyComponent', () => {
  let component: SubmitApplyComponent;
  let fixture: ComponentFixture<SubmitApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitApplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
