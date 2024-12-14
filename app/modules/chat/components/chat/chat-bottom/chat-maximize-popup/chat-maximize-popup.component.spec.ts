import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMaximizePopupComponent } from './chat-maximize-popup.component';

describe('ChatMaximizePopupComponent', () => {
  let component: ChatMaximizePopupComponent;
  let fixture: ComponentFixture<ChatMaximizePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMaximizePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMaximizePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
