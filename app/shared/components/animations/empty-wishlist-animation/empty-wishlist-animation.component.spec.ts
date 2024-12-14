import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyWishlistAnimationComponent } from './empty-wishlist-animation.component';

describe('EmptyWishlistAnimationComponent', () => {
  let component: EmptyWishlistAnimationComponent;
  let fixture: ComponentFixture<EmptyWishlistAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyWishlistAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyWishlistAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
