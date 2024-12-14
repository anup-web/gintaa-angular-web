import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingNotificationsComponent } from './matching-notifications.component';

describe('MatchingNotificationsComponent', () => {
  let component: MatchingNotificationsComponent;
  let fixture: ComponentFixture<MatchingNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchingNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
