import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingListingComponent } from './floating-listing.component';

describe('FloatingListingComponent', () => {
  let component: FloatingListingComponent;
  let fixture: ComponentFixture<FloatingListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
