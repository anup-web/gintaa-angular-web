import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAccountsListComponent } from './business-accounts-list.component';

describe('BusinessAccountsListComponent', () => {
  let component: BusinessAccountsListComponent;
  let fixture: ComponentFixture<BusinessAccountsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAccountsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
