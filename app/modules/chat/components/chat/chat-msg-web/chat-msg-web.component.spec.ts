import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMsgWebComponent } from './chat-msg-web.component';

describe('ChatMsgWebComponent', () => {
  let component: ChatMsgWebComponent;
  let fixture: ComponentFixture<ChatMsgWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMsgWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMsgWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
