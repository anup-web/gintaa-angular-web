import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCategoryListComponent } from './offer-category-list.component';

describe('OfferCategoryListComponent', () => {
  let component: OfferCategoryListComponent;
  let fixture: ComponentFixture<OfferCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
