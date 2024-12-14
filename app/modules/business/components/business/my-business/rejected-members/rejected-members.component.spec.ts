import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedMembersComponent } from './rejected-members.component';

describe('RejectedMembersComponent', () => {
  let component: RejectedMembersComponent;
  let fixture: ComponentFixture<RejectedMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
