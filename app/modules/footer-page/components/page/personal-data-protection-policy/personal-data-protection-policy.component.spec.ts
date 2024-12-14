import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataProtectionPolicyComponent } from './personal-data-protection-policy.component';

describe('PersonalDataProtectionPolicyComponent', () => {
  let component: PersonalDataProtectionPolicyComponent;
  let fixture: ComponentFixture<PersonalDataProtectionPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDataProtectionPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDataProtectionPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
