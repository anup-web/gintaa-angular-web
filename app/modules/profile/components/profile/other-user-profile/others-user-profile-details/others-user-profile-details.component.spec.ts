import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersUserProfileDetailsComponent } from './others-user-profile-details.component';

describe('OthersUserProfileDetailsComponent', () => {
  let component: OthersUserProfileDetailsComponent;
  let fixture: ComponentFixture<OthersUserProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersUserProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersUserProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
