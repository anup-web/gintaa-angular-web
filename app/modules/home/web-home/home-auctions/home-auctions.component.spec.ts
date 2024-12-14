import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAuctionsComponent } from './home-auctions.component';

describe('HomeAuctionsComponent', () => {
  let component: HomeAuctionsComponent;
  let fixture: ComponentFixture<HomeAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAuctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
