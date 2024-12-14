import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletDeliveryTrackComponent } from './wallet-delivery-track.component';

describe('WalletDeliveryTrackComponent', () => {
  let component: WalletDeliveryTrackComponent;
  let fixture: ComponentFixture<WalletDeliveryTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletDeliveryTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletDeliveryTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
