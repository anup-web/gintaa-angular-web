import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPotentialOffersComponent } from './match-potential-offers.component';

describe('MatchPotentialOffersComponent', () => {
  let component: MatchPotentialOffersComponent;
  let fixture: ComponentFixture<MatchPotentialOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPotentialOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPotentialOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
