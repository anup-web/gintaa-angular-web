import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletDeliveryComponent } from './wallet-delivery.component';

describe('WalletDeliveryComponent', () => {
  let component: WalletDeliveryComponent;
  let fixture: ComponentFixture<WalletDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
