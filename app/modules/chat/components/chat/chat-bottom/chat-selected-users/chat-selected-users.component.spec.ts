import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSelectedUsersComponent } from './chat-selected-users.component';

describe('ChatSelectedUsersComponent', () => {
  let component: ChatSelectedUsersComponent;
  let fixture: ComponentFixture<ChatSelectedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSelectedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSelectedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
