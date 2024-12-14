import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTermsConditionComponent } from './business-terms-condition.component';

describe('BusinessTermsConditionComponent', () => {
  let component: BusinessTermsConditionComponent;
  let fixture: ComponentFixture<BusinessTermsConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessTermsConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessTermsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
