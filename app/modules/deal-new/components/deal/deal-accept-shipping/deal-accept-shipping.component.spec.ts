import { ComponentFixture, TestBed } from '@angular/core/testing';

import { dealAcceptShippingComponent } from './deal-accept-shipping.component';

describe('dealAcceptShippingComponent', () => {
  let component: dealAcceptShippingComponent;
  let fixture: ComponentFixture<dealAcceptShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ dealAcceptShippingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(dealAcceptShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
