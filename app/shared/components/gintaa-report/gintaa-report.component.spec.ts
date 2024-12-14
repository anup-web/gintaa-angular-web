import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GintaaReportComponent } from './gintaa-report.component';

describe('GintaaReportComponent', () => {
  let component: GintaaReportComponent;
  let fixture: ComponentFixture<GintaaReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GintaaReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GintaaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
