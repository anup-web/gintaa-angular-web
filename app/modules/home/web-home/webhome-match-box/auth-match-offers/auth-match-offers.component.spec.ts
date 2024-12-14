import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMatchOffersComponent } from './auth-match-offers.component';

describe('AuthMatchOffersComponent', () => {
  let component: AuthMatchOffersComponent;
  let fixture: ComponentFixture<AuthMatchOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthMatchOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthMatchOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
