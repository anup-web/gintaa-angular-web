import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeExchangeAnimationComponent } from './make-exchange-animation.component';

describe('MakeExchangeAnimationComponent', () => {
  let component: MakeExchangeAnimationComponent;
  let fixture: ComponentFixture<MakeExchangeAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeExchangeAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeExchangeAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
