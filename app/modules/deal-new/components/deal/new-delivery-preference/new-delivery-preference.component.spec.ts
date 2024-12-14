import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeliveryPreferenceComponent } from './new-delivery-preference.component';

describe('NewDeliveryPreferenceComponent', () => {
  let component: NewDeliveryPreferenceComponent;
  let fixture: ComponentFixture<NewDeliveryPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDeliveryPreferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDeliveryPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
