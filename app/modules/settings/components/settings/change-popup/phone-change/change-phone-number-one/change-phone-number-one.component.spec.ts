import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhoneNumberOneComponent } from './change-phone-number-one.component';

describe('ChangePhoneNumberOneComponent', () => {
  let component: ChangePhoneNumberOneComponent;
  let fixture: ComponentFixture<ChangePhoneNumberOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhoneNumberOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhoneNumberOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
