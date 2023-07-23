import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentChallengesComponent } from './current-challenges.component';

describe('CurrentChallengesComponent', () => {
  let component: CurrentChallengesComponent;
  let fixture: ComponentFixture<CurrentChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentChallengesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
