import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSimilarOffersComponent } from './user-similar-offers.component';

describe('UserSimilarOffersComponent', () => {
  let component: UserSimilarOffersComponent;
  let fixture: ComponentFixture<UserSimilarOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSimilarOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSimilarOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
