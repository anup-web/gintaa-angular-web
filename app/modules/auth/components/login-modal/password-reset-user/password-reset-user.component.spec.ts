import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetUserComponent } from './password-reset-user.component';

describe('PasswordResetUserComponent', () => {
  let component: PasswordResetUserComponent;
  let fixture: ComponentFixture<PasswordResetUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordResetUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
