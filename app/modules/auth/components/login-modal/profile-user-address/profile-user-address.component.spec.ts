import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserAddressComponent } from './profile-user-address.component';

describe('ProfileUserAddressComponent', () => {
  let component: ProfileUserAddressComponent;
  let fixture: ComponentFixture<ProfileUserAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUserAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
