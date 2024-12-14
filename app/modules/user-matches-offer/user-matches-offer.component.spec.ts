import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMatchesOfferComponent } from './user-matches-offer.component';

describe('UserMatchesOfferComponent', () => {
  let component: UserMatchesOfferComponent;
  let fixture: ComponentFixture<UserMatchesOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMatchesOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMatchesOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
