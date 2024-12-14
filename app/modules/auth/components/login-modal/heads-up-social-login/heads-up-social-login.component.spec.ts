import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadsUpSocialLoginComponent } from './heads-up-social-login.component';

describe('HeadsUpSocialLoginComponent', () => {
  let component: HeadsUpSocialLoginComponent;
  let fixture: ComponentFixture<HeadsUpSocialLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadsUpSocialLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadsUpSocialLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
