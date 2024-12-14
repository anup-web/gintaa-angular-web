import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealRatingComponent } from './deal-rating.component';

describe('DealRatingComponent', () => {
  let component: DealRatingComponent;
  let fixture: ComponentFixture<DealRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
