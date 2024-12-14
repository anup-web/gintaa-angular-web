import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInvitationsComponent } from './business-invitations.component';

describe('BusinessInvitationsComponent', () => {
  let component: BusinessInvitationsComponent;
  let fixture: ComponentFixture<BusinessInvitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessInvitationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
