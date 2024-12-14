import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersNotificationsComponent } from './offers-notifications.component';

describe('OffersNotificationsComponent', () => {
  let component: OffersNotificationsComponent;
  let fixture: ComponentFixture<OffersNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
