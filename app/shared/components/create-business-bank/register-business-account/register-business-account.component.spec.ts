import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBusinessAccountComponent } from './register-business-account.component';

describe('RegisterBusinessAccountComponent', () => {
  let component: RegisterBusinessAccountComponent;
  let fixture: ComponentFixture<RegisterBusinessAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBusinessAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBusinessAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
