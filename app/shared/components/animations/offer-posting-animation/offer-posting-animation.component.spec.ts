import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPostingAnimationComponent } from './offer-posting-animation.component';

describe('OfferPostingAnimationComponent', () => {
  let component: OfferPostingAnimationComponent;
  let fixture: ComponentFixture<OfferPostingAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferPostingAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPostingAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
