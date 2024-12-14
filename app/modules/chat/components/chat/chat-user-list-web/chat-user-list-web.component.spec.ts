import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserListWebComponent } from './chat-user-list-web.component';

describe('ChatUserListWebComponent', () => {
  let component: ChatUserListWebComponent;
  let fixture: ComponentFixture<ChatUserListWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUserListWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUserListWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
