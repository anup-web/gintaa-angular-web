import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCheckoutComponent } from './deal-checkout.component';

describe('DealCheckoutComponent', () => {
  let component: DealCheckoutComponent;
  let fixture: ComponentFixture<DealCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
