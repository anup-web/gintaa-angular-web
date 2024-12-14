import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhomeRecommendedOffersComponent } from './webhome-recommended-offers.component';

describe('WebhomeRecommendedOffersComponent', () => {
  let component: WebhomeRecommendedOffersComponent;
  let fixture: ComponentFixture<WebhomeRecommendedOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhomeRecommendedOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhomeRecommendedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
