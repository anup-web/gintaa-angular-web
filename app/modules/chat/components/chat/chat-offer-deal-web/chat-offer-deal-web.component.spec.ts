import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatOfferDealWebComponent } from './chat-offer-deal-web.component';

describe('ChatOfferDealWebComponent', () => {
  let component: ChatOfferDealWebComponent;
  let fixture: ComponentFixture<ChatOfferDealWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatOfferDealWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatOfferDealWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
