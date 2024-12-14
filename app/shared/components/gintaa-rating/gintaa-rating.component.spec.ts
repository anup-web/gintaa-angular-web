import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GintaaRatingComponent } from './gintaa-rating.component';

describe('GintaaRatingComponent', () => {
  let component: GintaaRatingComponent;
  let fixture: ComponentFixture<GintaaRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GintaaRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GintaaRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
