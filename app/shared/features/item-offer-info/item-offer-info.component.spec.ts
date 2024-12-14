import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOfferInfoComponent } from './item-offer-info.component';

describe('ItemOfferInfoComponent', () => {
  let component: ItemOfferInfoComponent;
  let fixture: ComponentFixture<ItemOfferInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOfferInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOfferInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
