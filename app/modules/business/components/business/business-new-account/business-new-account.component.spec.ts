import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessNewAccountComponent } from './business-new-account.component';

describe('BusinessNewAccountComponent', () => {
  let component: BusinessNewAccountComponent;
  let fixture: ComponentFixture<BusinessNewAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessNewAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessNewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
