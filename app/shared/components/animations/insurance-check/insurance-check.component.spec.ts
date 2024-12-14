import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCheckComponent } from './insurance-check.component';

describe('InsuranceCheckComponent', () => {
  let component: InsuranceCheckComponent;
  let fixture: ComponentFixture<InsuranceCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
