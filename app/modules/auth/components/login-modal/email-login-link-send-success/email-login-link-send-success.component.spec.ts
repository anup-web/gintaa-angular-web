import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLoginLinkSendSuccessComponent } from './email-login-link-send-success.component';

describe('EmailLoginLinkSendSuccessComponent', () => {
  let component: EmailLoginLinkSendSuccessComponent;
  let fixture: ComponentFixture<EmailLoginLinkSendSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailLoginLinkSendSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailLoginLinkSendSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
