import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeOtpRightHandAnimationComponent } from './exchange-otp-right-hand-animation.component';

describe('ExchangeOtpRightHandAnimationComponent', () => {
  let component: ExchangeOtpRightHandAnimationComponent;
  let fixture: ComponentFixture<ExchangeOtpRightHandAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeOtpRightHandAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeOtpRightHandAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
