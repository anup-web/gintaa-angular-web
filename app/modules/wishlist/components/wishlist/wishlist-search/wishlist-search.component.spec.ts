import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistSearchComponent } from './wishlist-search.component';

describe('WishlistSearchComponent', () => {
  let component: WishlistSearchComponent;
  let fixture: ComponentFixture<WishlistSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
