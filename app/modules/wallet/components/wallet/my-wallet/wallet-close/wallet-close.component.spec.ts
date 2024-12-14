import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCloseComponent } from './wallet-close.component';

describe('WalletCloseComponent', () => {
  let component: WalletCloseComponent;
  let fixture: ComponentFixture<WalletCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
