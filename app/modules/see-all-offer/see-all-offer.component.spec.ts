import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllOfferComponent } from './see-all-offer.component';

describe('SeeAllOfferComponent', () => {
  let component: SeeAllOfferComponent;
  let fixture: ComponentFixture<SeeAllOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeAllOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAllOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
