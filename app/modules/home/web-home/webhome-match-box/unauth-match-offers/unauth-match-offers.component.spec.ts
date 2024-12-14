import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthMatchOffersComponent } from './unauth-match-offers.component';

describe('UnauthMatchOffersComponent', () => {
  let component: UnauthMatchOffersComponent;
  let fixture: ComponentFixture<UnauthMatchOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthMatchOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthMatchOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
