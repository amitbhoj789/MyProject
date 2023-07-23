import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BothmatchSolutionsComponent } from './bothmatch-solutions.component';

describe('BothmatchSolutionsComponent', () => {
  let component: BothmatchSolutionsComponent;
  let fixture: ComponentFixture<BothmatchSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BothmatchSolutionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BothmatchSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
