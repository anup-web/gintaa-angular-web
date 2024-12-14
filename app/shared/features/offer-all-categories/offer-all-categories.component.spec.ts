import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAllCategoriesComponent } from './offer-all-categories.component';

describe('OfferAllCategoriesComponent', () => {
  let component: OfferAllCategoriesComponent;
  let fixture: ComponentFixture<OfferAllCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferAllCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferAllCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
