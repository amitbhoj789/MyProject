import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInputComponent } from './additional-input.component';

describe('AdditionalInputComponent', () => {
  let component: AdditionalInputComponent;
  let fixture: ComponentFixture<AdditionalInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
