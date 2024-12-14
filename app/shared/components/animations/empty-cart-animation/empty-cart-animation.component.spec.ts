import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCartAnimationComponent } from './empty-cart-animation.component';

describe('EmptyCartAnimationComponent', () => {
  let component: EmptyCartAnimationComponent;
  let fixture: ComponentFixture<EmptyCartAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyCartAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCartAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
