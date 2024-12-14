import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatOfferDealComponent } from './chat-offer-deal.component';

describe('ChatOfferDealComponent', () => {
  let component: ChatOfferDealComponent;
  let fixture: ComponentFixture<ChatOfferDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatOfferDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatOfferDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
