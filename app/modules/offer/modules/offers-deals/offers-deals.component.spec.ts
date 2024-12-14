import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersDealsComponent } from './offers-deals.component';

describe('OffersDealsComponent', () => {
  let component: OffersDealsComponent;
  let fixture: ComponentFixture<OffersDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
