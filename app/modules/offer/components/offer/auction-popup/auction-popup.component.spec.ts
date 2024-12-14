import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionPopupComponent } from './auction-popup.component';

describe('AuctionPopupComponent', () => {
  let component: AuctionPopupComponent;
  let fixture: ComponentFixture<AuctionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
