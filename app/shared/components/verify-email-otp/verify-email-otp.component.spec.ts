import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailOtpComponent } from './verify-email-otp.component';

describe('VerifyEmailOtpComponent', () => {
  let component: VerifyEmailOtpComponent;
  let fixture: ComponentFixture<VerifyEmailOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyEmailOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
