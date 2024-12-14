import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDobGenderComponent } from './profile-dob-gender.component';

describe('ProfileDobGenderComponent', () => {
  let component: ProfileDobGenderComponent;
  let fixture: ComponentFixture<ProfileDobGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDobGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDobGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
