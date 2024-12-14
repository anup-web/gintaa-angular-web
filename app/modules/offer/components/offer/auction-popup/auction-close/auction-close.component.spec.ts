import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCloseComponent } from './auction-close.component';

describe('AuctionCloseComponent', () => {
  let component: AuctionCloseComponent;
  let fixture: ComponentFixture<AuctionCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
