import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyOfferCartAnimationComponent } from './empty-offer-cart-animation.component';

describe('EmptyOfferCartAnimationComponent', () => {
  let component: EmptyOfferCartAnimationComponent;
  let fixture: ComponentFixture<EmptyOfferCartAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyOfferCartAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyOfferCartAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
