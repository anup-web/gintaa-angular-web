import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionSuccessComponent } from './auction-success.component';

describe('AuctionSuccessComponent', () => {
  let component: AuctionSuccessComponent;
  let fixture: ComponentFixture<AuctionSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
