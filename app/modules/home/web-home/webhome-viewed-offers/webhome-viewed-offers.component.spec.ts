import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhomeViewedOffersComponent } from './webhome-viewed-offers.component';

describe('WebhomeViewedOffersComponent', () => {
  let component: WebhomeViewedOffersComponent;
  let fixture: ComponentFixture<WebhomeViewedOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhomeViewedOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhomeViewedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
