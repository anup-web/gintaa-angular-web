import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeOtpLeftHandAnimationComponent } from './exchange-otp-left-hand-animation.component';

describe('ExchangeOtpLeftHandAnimationComponent', () => {
  let component: ExchangeOtpLeftHandAnimationComponent;
  let fixture: ComponentFixture<ExchangeOtpLeftHandAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeOtpLeftHandAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeOtpLeftHandAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
