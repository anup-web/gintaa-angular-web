import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordEmailSendComponent } from './reset-password-email-send.component';

describe('ResetPasswordEmailSendComponent', () => {
  let component: ResetPasswordEmailSendComponent;
  let fixture: ComponentFixture<ResetPasswordEmailSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordEmailSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordEmailSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
