import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLoginLinkVerifyComponent } from './email-login-link-verify.component';

describe('EmailLoginLinkVerifyComponent', () => {
  let component: EmailLoginLinkVerifyComponent;
  let fixture: ComponentFixture<EmailLoginLinkVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailLoginLinkVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailLoginLinkVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
