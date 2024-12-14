import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAccountPopupComponent } from './business-account-popup.component';

describe('BusinessAccountPopupComponent', () => {
  let component: BusinessAccountPopupComponent;
  let fixture: ComponentFixture<BusinessAccountPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAccountPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAccountPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
