import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAttachAudioComponent } from './chat-attach-audio.component';

describe('ChatAttachAudioComponent', () => {
  let component: ChatAttachAudioComponent;
  let fixture: ComponentFixture<ChatAttachAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAttachAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAttachAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
