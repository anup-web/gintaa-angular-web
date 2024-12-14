import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAllOfferComponent } from './user-all-offer.component';

describe('UserAllOfferComponent', () => {
  let component: UserAllOfferComponent;
  let fixture: ComponentFixture<UserAllOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAllOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAllOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
