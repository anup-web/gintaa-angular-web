import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserEmailVerifyComponent } from './new-user-email-verify.component';

describe('NewUserEmailVerifyComponent', () => {
  let component: NewUserEmailVerifyComponent;
  let fixture: ComponentFixture<NewUserEmailVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserEmailVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserEmailVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
