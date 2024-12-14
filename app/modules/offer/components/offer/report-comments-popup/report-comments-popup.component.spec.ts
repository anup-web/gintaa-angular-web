import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCommentsPopupComponent } from './report-comments-popup.component';

describe('ReportCommentsPopupComponent', () => {
  let component: ReportCommentsPopupComponent;
  let fixture: ComponentFixture<ReportCommentsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCommentsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCommentsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
