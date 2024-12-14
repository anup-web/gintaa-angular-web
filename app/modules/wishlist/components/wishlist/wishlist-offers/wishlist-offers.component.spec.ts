import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistOffersComponent } from './wishlist-offers.component';

describe('WishlistOffersComponent', () => {
  let component: WishlistOffersComponent;
  let fixture: ComponentFixture<WishlistOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
