import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAttachOffersComponent } from './chat-attach-offers.component';

describe('ChatAttachOffersComponent', () => {
  let component: ChatAttachOffersComponent;
  let fixture: ComponentFixture<ChatAttachOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAttachOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAttachOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
