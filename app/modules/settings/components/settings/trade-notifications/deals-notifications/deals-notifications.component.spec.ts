import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsNotificationsComponent } from './deals-notifications.component';

describe('DealsNotificationsComponent', () => {
  let component: DealsNotificationsComponent;
  let fixture: ComponentFixture<DealsNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
