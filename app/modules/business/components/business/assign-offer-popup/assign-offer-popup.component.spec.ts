import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignOfferPopupComponent } from './assign-offer-popup.component';

describe('AssignOfferPopupComponent', () => {
  let component: AssignOfferPopupComponent;
  let fixture: ComponentFixture<AssignOfferPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignOfferPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignOfferPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
