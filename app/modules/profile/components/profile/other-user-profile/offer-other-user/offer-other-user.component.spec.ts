import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferOtherUserComponent } from './offer-other-user.component';

describe('OfferOtherUserComponent', () => {
  let component: OfferOtherUserComponent;
  let fixture: ComponentFixture<OfferOtherUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferOtherUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferOtherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
