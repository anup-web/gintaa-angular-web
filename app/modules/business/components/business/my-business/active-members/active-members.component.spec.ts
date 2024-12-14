import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMembersComponent } from './active-members.component';

describe('ActiveMembersComponent', () => {
  let component: ActiveMembersComponent;
  let fixture: ComponentFixture<ActiveMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
