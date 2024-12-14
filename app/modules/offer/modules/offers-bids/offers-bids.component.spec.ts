import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersBidsComponent } from './offers-bids.component';

describe('OffersBidsComponent', () => {
  let component: OffersBidsComponent;
  let fixture: ComponentFixture<OffersBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
