import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerifySuccessComponent } from './email-verify-success.component';

describe('EmailVerifySuccessComponent', () => {
  let component: EmailVerifySuccessComponent;
  let fixture: ComponentFixture<EmailVerifySuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailVerifySuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerifySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
