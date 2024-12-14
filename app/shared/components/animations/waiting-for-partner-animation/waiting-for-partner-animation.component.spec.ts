import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingForPartnerAnimationComponent } from './waiting-for-partner-animation.component';

describe('WaitingForPartnerAnimationComponent', () => {
  let component: WaitingForPartnerAnimationComponent;
  let fixture: ComponentFixture<WaitingForPartnerAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingForPartnerAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingForPartnerAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
