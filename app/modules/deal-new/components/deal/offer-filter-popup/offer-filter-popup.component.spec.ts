import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferFilterPopupComponent } from './offer-filter-popup.component';

describe('OfferFilterPopupComponent', () => {
  let component: OfferFilterPopupComponent;
  let fixture: ComponentFixture<OfferFilterPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferFilterPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferFilterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
