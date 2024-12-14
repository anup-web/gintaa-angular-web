import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfileViewComponent } from './member-profile-view.component';

describe('MemberProfileViewComponent', () => {
  let component: MemberProfileViewComponent;
  let fixture: ComponentFixture<MemberProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
