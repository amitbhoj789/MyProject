import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefulDetailsComponent } from './useful-details.component';

describe('UsefulDetailsComponent', () => {
  let component: UsefulDetailsComponent;
  let fixture: ComponentFixture<UsefulDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsefulDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsefulDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
