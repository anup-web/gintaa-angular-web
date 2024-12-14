import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAttachImageComponent } from './chat-attach-image.component';

describe('ChatAttachImageComponent', () => {
  let component: ChatAttachImageComponent;
  let fixture: ComponentFixture<ChatAttachImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAttachImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAttachImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
