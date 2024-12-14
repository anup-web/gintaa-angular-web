import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GintaaFeedbackComponent } from './gintaa-feedback.component';

describe('GintaaFeedbackComponent', () => {
  let component: GintaaFeedbackComponent;
  let fixture: ComponentFixture<GintaaFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GintaaFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GintaaFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
