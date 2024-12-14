import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteOfferSkeletonComponent } from './favourite-offer-skeleton.component';

describe('FavouriteOfferSkeletonComponent', () => {
  let component: FavouriteOfferSkeletonComponent;
  let fixture: ComponentFixture<FavouriteOfferSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteOfferSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteOfferSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
