import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAcceptComponent } from './wallet-accept.component';

describe('WalletAcceptComponent', () => {
  let component: WalletAcceptComponent;
  let fixture: ComponentFixture<WalletAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
