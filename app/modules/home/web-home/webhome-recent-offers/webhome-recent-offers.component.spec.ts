import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhomeRecentOffersComponent } from './webhome-recent-offers.component';

describe('WebhomeRecentOffersComponent', () => {
  let component: WebhomeRecentOffersComponent;
  let fixture: ComponentFixture<WebhomeRecentOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhomeRecentOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhomeRecentOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
