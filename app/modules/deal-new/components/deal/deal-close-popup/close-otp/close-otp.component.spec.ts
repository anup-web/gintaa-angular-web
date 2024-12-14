import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOtpComponent } from './close-otp.component';

describe('CloseOtpComponent', () => {
  let component: CloseOtpComponent;
  let fixture: ComponentFixture<CloseOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
