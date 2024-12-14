import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorStepDeliveryComponent } from './door-step-delivery.component';

describe('DoorStepDeliveryComponent', () => {
  let component: DoorStepDeliveryComponent;
  let fixture: ComponentFixture<DoorStepDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoorStepDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorStepDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
