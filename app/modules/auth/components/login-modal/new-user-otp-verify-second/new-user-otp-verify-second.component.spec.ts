import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserOtpVerifySecondComponent } from './new-user-otp-verify-second.component';

describe('NewUserOtpVerifySecondComponent', () => {
  let component: NewUserOtpVerifySecondComponent;
  let fixture: ComponentFixture<NewUserOtpVerifySecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserOtpVerifySecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserOtpVerifySecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
