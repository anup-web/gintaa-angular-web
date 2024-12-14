import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealStepperComponent } from './deal-stepper.component';

describe('DealStepperComponent', () => {
  let component: DealStepperComponent;
  let fixture: ComponentFixture<DealStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
