import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOfferDelegateComponent } from './business-offer-delegate.component';

describe('BusinessOfferDelegateComponent', () => {
  let component: BusinessOfferDelegateComponent;
  let fixture: ComponentFixture<BusinessOfferDelegateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessOfferDelegateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessOfferDelegateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
