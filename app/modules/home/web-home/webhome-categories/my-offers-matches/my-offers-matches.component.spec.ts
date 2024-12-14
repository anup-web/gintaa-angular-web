import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOffersMatchesComponent } from './my-offers-matches.component';

describe('MyOffersMatchesComponent', () => {
  let component: MyOffersMatchesComponent;
  let fixture: ComponentFixture<MyOffersMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOffersMatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOffersMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
