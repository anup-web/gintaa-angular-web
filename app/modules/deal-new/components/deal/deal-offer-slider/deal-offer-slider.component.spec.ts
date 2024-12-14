import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealOfferSliderComponent } from './deal-offer-slider.component';

describe('DealOfferSliderComponent', () => {
  let component: DealOfferSliderComponent;
  let fixture: ComponentFixture<DealOfferSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealOfferSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealOfferSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
