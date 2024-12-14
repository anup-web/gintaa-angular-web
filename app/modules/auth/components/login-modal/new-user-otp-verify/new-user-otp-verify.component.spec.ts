import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserOtpVerifyComponent } from './new-user-otp-verify.component';

describe('NewUserOtpVerifyComponent', () => {
  let component: NewUserOtpVerifyComponent;
  let fixture: ComponentFixture<NewUserOtpVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserOtpVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserOtpVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
