import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhoneNumberTwoComponent } from './change-phone-number-two.component';

describe('ChangePhoneNumberTwoComponent', () => {
  let component: ChangePhoneNumberTwoComponent;
  let fixture: ComponentFixture<ChangePhoneNumberTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhoneNumberTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhoneNumberTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
