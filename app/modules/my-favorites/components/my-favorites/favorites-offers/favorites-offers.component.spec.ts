import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesOffersComponent } from './favorites-offers.component';

describe('FavoritesOffersComponent', () => {
  let component: FavoritesOffersComponent;
  let fixture: ComponentFixture<FavoritesOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
