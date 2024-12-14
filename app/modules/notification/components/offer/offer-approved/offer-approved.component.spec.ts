import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferApprovedComponent } from './offer-approved.component';

describe('OfferApprovedComponent', () => {
  let component: OfferApprovedComponent;
  let fixture: ComponentFixture<OfferApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
