import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedMemberComponent } from './invited-member.component';

describe('InvitedMemberComponent', () => {
  let component: InvitedMemberComponent;
  let fixture: ComponentFixture<InvitedMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
