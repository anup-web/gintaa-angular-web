import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovedMembersComponent } from './removed-members.component';

describe('RemovedMembersComponent', () => {
  let component: RemovedMembersComponent;
  let fixture: ComponentFixture<RemovedMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovedMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovedMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
