import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingOfferSliderComponent } from './incoming-offer-slider.component';

describe('IncomingOfferSliderComponent', () => {
  let component: IncomingOfferSliderComponent;
  let fixture: ComponentFixture<IncomingOfferSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingOfferSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingOfferSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
