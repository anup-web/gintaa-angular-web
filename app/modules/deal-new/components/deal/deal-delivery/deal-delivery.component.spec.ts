import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealDeliveryComponent } from './deal-delivery.component';

describe('DealDeliveryComponent', () => {
  let component: DealDeliveryComponent;
  let fixture: ComponentFixture<DealDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
