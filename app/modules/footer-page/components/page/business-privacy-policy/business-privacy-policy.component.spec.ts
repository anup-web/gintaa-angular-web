import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPrivacyPolicyComponent } from './business-privacy-policy.component';

describe('BusinessPrivacyPolicyComponent', () => {
  let component: BusinessPrivacyPolicyComponent;
  let fixture: ComponentFixture<BusinessPrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessPrivacyPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
