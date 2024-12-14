import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUnderReviewComponent } from './register-under-review.component';

describe('RegisterUnderReviewComponent', () => {
  let component: RegisterUnderReviewComponent;
  let fixture: ComponentFixture<RegisterUnderReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUnderReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUnderReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
