import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchExistingOffersComponent } from './match-existing-offers.component';

describe('MatchExistingOffersComponent', () => {
  let component: MatchExistingOffersComponent;
  let fixture: ComponentFixture<MatchExistingOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchExistingOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchExistingOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
