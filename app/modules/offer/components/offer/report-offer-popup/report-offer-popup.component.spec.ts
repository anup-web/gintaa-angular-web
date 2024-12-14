import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOfferPopupComponent } from './report-offer-popup.component';

describe('ReportOfferPopupComponent', () => {
  let component: ReportOfferPopupComponent;
  let fixture: ComponentFixture<ReportOfferPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOfferPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOfferPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
