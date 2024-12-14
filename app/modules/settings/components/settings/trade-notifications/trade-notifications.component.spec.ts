import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeNotificationsComponent } from './trade-notifications.component';

describe('TradeNotificationsComponent', () => {
  let component: TradeNotificationsComponent;
  let fixture: ComponentFixture<TradeNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
