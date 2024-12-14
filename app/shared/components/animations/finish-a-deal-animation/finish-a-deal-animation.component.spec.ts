import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishADealAnimationComponent } from './finish-a-deal-animation.component';

describe('FinishADealAnimationComponent', () => {
  let component: FinishADealAnimationComponent;
  let fixture: ComponentFixture<FinishADealAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishADealAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishADealAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
