import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBankAccountComponent } from './register-bank-account.component';

describe('RegisterBankAccountComponent', () => {
  let component: RegisterBankAccountComponent;
  let fixture: ComponentFixture<RegisterBankAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBankAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
