import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneOtpVerifyComponent } from './phone-otp-verify.component';

describe('PhoneOtpVerifyComponent', () => {
  let component: PhoneOtpVerifyComponent;
  let fixture: ComponentFixture<PhoneOtpVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneOtpVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneOtpVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
