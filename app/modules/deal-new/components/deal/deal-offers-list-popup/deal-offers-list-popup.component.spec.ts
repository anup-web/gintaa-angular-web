import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealOffersListPopupComponent } from './deal-offers-list-popup.component';

describe('DealOffersListPopupComponent', () => {
  let component: DealOffersListPopupComponent;
  let fixture: ComponentFixture<DealOffersListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealOffersListPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealOffersListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
