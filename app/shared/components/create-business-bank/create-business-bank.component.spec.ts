import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusinessBankComponent } from './create-business-bank.component';

describe('CreateBusinessBankComponent', () => {
  let component: CreateBusinessBankComponent;
  let fixture: ComponentFixture<CreateBusinessBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBusinessBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBusinessBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
