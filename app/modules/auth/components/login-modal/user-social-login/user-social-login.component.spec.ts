import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSocialLoginComponent } from './user-social-login.component';

describe('UserSocialLoginComponent', () => {
  let component: UserSocialLoginComponent;
  let fixture: ComponentFixture<UserSocialLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSocialLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSocialLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
