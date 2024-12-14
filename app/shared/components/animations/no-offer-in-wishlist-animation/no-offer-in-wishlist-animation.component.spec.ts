import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOfferInWishlistAnimationComponent } from './no-offer-in-wishlist-animation.component';

describe('NoOfferInWishlistAnimationComponent', () => {
  let component: NoOfferInWishlistAnimationComponent;
  let fixture: ComponentFixture<NoOfferInWishlistAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoOfferInWishlistAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoOfferInWishlistAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
