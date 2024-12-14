import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedOfferDealComponentComponent } from './selected-offer-deal-component.component';

describe('SelectedOfferDealComponentComponent', () => {
  let component: SelectedOfferDealComponentComponent;
  let fixture: ComponentFixture<SelectedOfferDealComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedOfferDealComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedOfferDealComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
