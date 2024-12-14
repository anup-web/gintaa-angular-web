import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCardDefaultComponent } from './offer-card-default.component';

describe('OfferCardDefaultComponent', () => {
  let component: OfferCardDefaultComponent;
  let fixture: ComponentFixture<OfferCardDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferCardDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferCardDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
