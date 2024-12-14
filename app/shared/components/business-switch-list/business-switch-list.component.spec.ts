import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSwitchListComponent } from './business-switch-list.component';

describe('BusinessSwitchListComponent', () => {
  let component: BusinessSwitchListComponent;
  let fixture: ComponentFixture<BusinessSwitchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSwitchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSwitchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
