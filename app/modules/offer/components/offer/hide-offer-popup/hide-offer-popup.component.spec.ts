import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideOfferPopupComponent } from './hide-offer-popup.component';

describe('HideOfferPopupComponent', () => {
  let component: HideOfferPopupComponent;
  let fixture: ComponentFixture<HideOfferPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HideOfferPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HideOfferPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
