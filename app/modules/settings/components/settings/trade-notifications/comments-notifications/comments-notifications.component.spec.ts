import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsNotificationsComponent } from './comments-notifications.component';

describe('CommentsNotificationsComponent', () => {
  let component: CommentsNotificationsComponent;
  let fixture: ComponentFixture<CommentsNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
