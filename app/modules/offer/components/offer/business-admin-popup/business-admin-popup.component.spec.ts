import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAdminPopupComponent } from './business-admin-popup.component';

describe('BusinessAdminPopupComponent', () => {
  let component: BusinessAdminPopupComponent;
  let fixture: ComponentFixture<BusinessAdminPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAdminPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAdminPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
