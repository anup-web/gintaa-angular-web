import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileLocationComponent } from './user-profile-location.component';

describe('UserProfileLocationComponent', () => {
  let component: UserProfileLocationComponent;
  let fixture: ComponentFixture<UserProfileLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
