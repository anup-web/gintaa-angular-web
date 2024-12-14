import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedMembersComponent } from './invited-members.component';

describe('InvitedMembersComponent', () => {
  let component: InvitedMembersComponent;
  let fixture: ComponentFixture<InvitedMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
