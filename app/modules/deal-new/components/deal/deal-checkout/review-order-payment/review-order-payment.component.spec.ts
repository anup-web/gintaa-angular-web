import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrderPaymentComponent } from './review-order-payment.component';

describe('ReviewOrderPaymentComponent', () => {
  let component: ReviewOrderPaymentComponent;
  let fixture: ComponentFixture<ReviewOrderPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewOrderPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOrderPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
