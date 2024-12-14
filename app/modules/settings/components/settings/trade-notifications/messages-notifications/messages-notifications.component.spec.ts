import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesNotificationsComponent } from './messages-notifications.component';

describe('MessagesNotificationsComponent', () => {
  let component: MessagesNotificationsComponent;
  let fixture: ComponentFixture<MessagesNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
