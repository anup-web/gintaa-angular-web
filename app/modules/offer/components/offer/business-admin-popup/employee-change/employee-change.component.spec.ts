import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeChangeComponent } from './employee-change.component';

describe('EmployeeChangeComponent', () => {
  let component: EmployeeChangeComponent;
  let fixture: ComponentFixture<EmployeeChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
