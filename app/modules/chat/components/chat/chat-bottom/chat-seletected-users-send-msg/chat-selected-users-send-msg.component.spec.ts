import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSelectedUsersSendMsgComponent } from './chat-selected-users-send-msg.component';

describe('ChatTestComponent', () => {
  let component: ChatSelectedUsersSendMsgComponent;
  let fixture: ComponentFixture<ChatSelectedUsersSendMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSelectedUsersSendMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSelectedUsersSendMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
