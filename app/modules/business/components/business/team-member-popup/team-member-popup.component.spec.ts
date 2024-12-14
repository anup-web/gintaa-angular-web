import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberPopupComponent } from './team-member-popup.component';

describe('TeamMemberPopupComponent', () => {
  let component: TeamMemberPopupComponent;
  let fixture: ComponentFixture<TeamMemberPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMemberPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
