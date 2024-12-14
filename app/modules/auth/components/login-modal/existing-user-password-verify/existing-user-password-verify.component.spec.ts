import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingUserPasswordVerifyComponent } from './existing-user-password-verify.component';

describe('ExistingUserPasswordVerifyComponent', () => {
  let component: ExistingUserPasswordVerifyComponent;
  let fixture: ComponentFixture<ExistingUserPasswordVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingUserPasswordVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingUserPasswordVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
