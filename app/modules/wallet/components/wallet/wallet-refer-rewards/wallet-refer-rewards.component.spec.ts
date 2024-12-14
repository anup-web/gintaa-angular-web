import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletReferRewardsComponent } from './wallet-refer-rewards.component';

describe('WalletReferRewardsComponent', () => {
  let component: WalletReferRewardsComponent;
  let fixture: ComponentFixture<WalletReferRewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletReferRewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletReferRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
