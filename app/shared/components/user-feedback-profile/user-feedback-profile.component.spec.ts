import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeedbackProfileComponent } from './user-feedback-profile.component';

describe('UserFeedbackProfileComponent', () => {
  let component: UserFeedbackProfileComponent;
  let fixture: ComponentFixture<UserFeedbackProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFeedbackProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedbackProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
