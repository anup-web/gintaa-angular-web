import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePhoneEmailComponent } from './profile-phone-email.component';

describe('ProfilePhoneEmailComponent', () => {
  let component: ProfilePhoneEmailComponent;
  let fixture: ComponentFixture<ProfilePhoneEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePhoneEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePhoneEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
